/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function gameBoard() {
	this.tiles = new Array();
	this.bombs = new Array();
	this.keyQueue = new Array();
	this.player = null;
	this.canvas = null;
	this.panel = null;
	this.lastKeysDown = null;
	this.bind = function(board, cb) {
		board.canvas.keydown(function(e) {
			board.keyDownCode = e.keyCode;
		});

		board.canvas.keyup(function(e) {
			board.keyDownCode = null;
			board.keyUpCode = e.keyCode;
		});

		console.log("Gameboard binding");
		cb();
	};
	this.getTile = function(board, xPos, yPos, cb) {
		var selectedTile = null;
		for(var tile in board.tiles) {
			var currentTile = board.tiles[tile];
			if(currentTile.X == xPos && currentTile.Y == yPos) {
				selectedTile = currentTile;
			}
		}

		cb(selectedTile);
	}
	this.init = function(cb) {
		// select the game board, put it into the right size
		this.canvas = $('#mainCanvas');

		// to not use width() or height() methods here, it'll screw the canvas up
		this.canvas.attr('width', config.canvasWidth);
		this.canvas.attr('height', config.canvasHeight);

		this.canvas.focus();

		// set the scale to 1, 1 to avoid any 
		this.canvas.scaleCanvas({
		  scaleX: 1, scaleY: 1
		})

		console.log('Gameboard initilization');

		// generate map
		//var tile = new tile();

		for(var i = 0;i < 20;i++) {

			for(var e = 0;e < 20;e++) {
				var newTile = new tile();
				newTile.X = i * config.tileSize;
				newTile.Y = e * config.tileSize + config.panelHeight;
				newTile.identifier = i + (e*i);
				newTile.sprite = 'grass';

				var random = Math.floor(Math.random() * 6);

				if(i == 0 || e == 0 || i == 19 || e == 19) {
					// paint walls
					newTile.color = '#900';
					newTile.isBorder = true;
					newTile.isWalkable = false;
					newTile.sprite = 'stoneWall';
				} else if(random == 5) {
					// some random walls
					newTile.color = '#00C';
					newTile.isWalkable = false;
					newTile.isDestructable = true;
					newTile.sprite = 'wall';


					var itemRandom = Math.floor(Math.random() * 6);
					if(itemRandom == 3) {
						// some walls have items inside them
						var newItem = new item();
						newItem.X = newTile.X;
						newItem.Y = newTile.Y;
						newItem.type = 1;
						newItem.name = 'Bomb count';
						newItem.color = '#3a9dc2';
						newItem.sprite = 'bomb_bonus';

						newTile.hasItem = true;
						newTile.item = newItem;
					} else if(itemRandom == 4){

						// this adds to player bomb radius
						var newItem = new item();
						newItem.X = newTile.X;
						newItem.Y = newTile.Y;
						newItem.type = 2;
						newItem.name = 'Bomb radius';
						newItem.color = '#52ce7e';
						newItem.sprite = 'bomb_radius';

						newTile.hasItem = true;
						newTile.item = newItem;
					}
				}
				this.tiles.push(newTile);
			}
		}


		// add player
		var newPlayer = new player();
		this.player = newPlayer;
		
		var infoPanel = new panel();
		this.panel = infoPanel;

		cb();
	};
	 
	this.update = function(cb) {
		this.player.tilesOn = new Array();

		var playerX = this.player.X;
		var playerY = this.player.Y;

		var playerFarX = playerX + config.tileSize - 3;
		var playerFarY = playerY + config.tileSize - 3;

		for(var tile in this.tiles) {
			var currentTile = this.tiles[tile];
			
			if((playerX >= currentTile.X
				&& playerY >= currentTile.Y
				&& playerY <= (currentTile.Y + config.tileSize)
				&& playerX <= (currentTile.X + config.tileSize))
				||
				(playerFarX >= currentTile.X
				&& playerFarY >= currentTile.Y
				&& playerFarY <= (currentTile.Y + config.tileSize)
				&& playerFarX <= (currentTile.X + config.tileSize)) 
				||
				(playerFarX >= currentTile.X
				&& playerY >= currentTile.Y
				&& playerY <= (currentTile.Y + config.tileSize)
				&& playerFarX <= (currentTile.X + config.tileSize))
				||
				(playerX >= currentTile.X
				&& playerFarY >= currentTile.Y
				&& playerFarY <= (currentTile.Y + config.tileSize)
				&& playerX <= (currentTile.X + config.tileSize)))	{

				// add this to player on Tiles
				this.player.tilesOn.push(currentTile);
			}
		}

		// handle the key pressed
		for(var key in this.keyQueue) {
			var keyDownCode = this.keyQueue[key];
			if(keyDownCode == 39) {
				this.player.move(this, this.player.speed, 0);
				this.player.sprite = "player_right";
			}

			if(keyDownCode == 38) {
				this.player.move(this, 0, this.player.speed * -1);
				this.player.sprite = "player_up";
			}

			if(keyDownCode == 37) {
				this.player.move(this, this.player.speed * -1, 0);
				this.player.sprite = "player_left";
			}

			if(keyDownCode == 40) {
				this.player.move(this, 0, this.player.speed);
				this.player.sprite = "player_down";
			}

			if(keyDownCode == 32) {
				// plant a bomb
				var newBomb = new bomb();

				var board = this;
				if(this.player.bombs > 0) {
					this.player.plantBomb(board, function(tile) {
						if(tile) {
							board.player.bombs--;
							newBomb.X = tile.X;
							newBomb.Y = tile.Y;
							newBomb.sprite = 'bomb';
							newBomb.tileId = tile.identifier;
							newBomb.boomRadius = board.player.bombRadius;
							newBomb.originTile = tile;

							newBomb.timer(board, newBomb, board.player);
							board.bombs.push(newBomb);
						}
					})
				}

			}
			
			//this.lastKeysDown = this.keyQueue;
		} // end of input handling


		cb();
	};

	this.selectTile = function(xPos, yPos, cb) {
		for(var tile in this.tiles) {
			if(this.tiles[tile].X == xPos && this.tiles[tile].Y == yPos) {
				cb(this.tiles[tile]);
			}
		}
	};
	this.draw = function() {
		// clear canvas
		this.canvas.clearCanvas();

		// panel
		this.panel.draw(this.canvas, this);

		// tiles
		for(var tile in this.tiles) {
			this.tiles[tile].draw(this.canvas);
		}

		// bombs
		for(var bomb in this.bombs) {
			this.bombs[bomb].draw(this.canvas);
		}

		// player
		this.player.draw(this.canvas);
	};
}