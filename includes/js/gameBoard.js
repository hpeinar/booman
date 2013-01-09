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

	// move timer
	this.isMoving = false;
	this.movingTimer = 0;
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
				newTile.sprite = 'GRASS';

				var random = Math.floor(Math.random() * 6);

				if(i == 0 || e == 0 || i == 19 || e == 19) {
					// paint walls
					newTile.isBorder = true;
					newTile.isWalkable = false;
					newTile.sprite = 'WALL';
				} else if(random == 5) {
					// some random walls
					newTile.isWalkable = false;
					newTile.isDestructable = true;
					newTile.sprite = 'BREAKABLE_WALL';


					var itemRandom = Math.floor(Math.random() * 6);
					if(itemRandom == 3) {
						// some walls have items inside them
						var newItem = new item();
						newItem.X = newTile.X;
						newItem.Y = newTile.Y;
						newItem.type = 1;
						newItem.name = 'Bomb count';
						newItem.sprite = 'BOMB_BONUS';

						newTile.hasItem = true;
						newTile.item = newItem;
					} else if(itemRandom == 4){

						// this adds to player bomb radius
						var newItem = new item();
						newItem.X = newTile.X;
						newItem.Y = newTile.Y;
						newItem.type = 2;
						newItem.name = 'Bomb radius';
						newItem.sprite = 'RADIUS_BONUS';

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

		var playerFarX = playerX + (config.tileSize - 1);
		var playerFarY = playerY + (config.tileSize - 1);

		for(var tile in this.tiles) {
			var currentTile = this.tiles[tile];
			
			if((playerX >= currentTile.X
				&& playerY >= currentTile.Y
				&& playerY <= (currentTile.Y + (config.tileSize - 1))
				&& playerX <= (currentTile.X + (config.tileSize - 1)))
				||
				(playerFarX >= currentTile.X
				&& playerFarY >= currentTile.Y
				&& playerFarY <= (currentTile.Y + (config.tileSize - 1))
				&& playerFarX <= (currentTile.X + (config.tileSize - 1))) 
				||
				(playerFarX >= currentTile.X
				&& playerY >= currentTile.Y
				&& playerY <= (currentTile.Y + (config.tileSize - 1))
				&& playerFarX <= (currentTile.X + (config.tileSize - 1)))
				||
				(playerX >= currentTile.X
				&& playerFarY >= currentTile.Y
				&& playerFarY <= (currentTile.Y + (config.tileSize - 1))
				&& playerX <= (currentTile.X + (config.tileSize - 1))))	{

				// add this to player on Tiles
				this.player.tilesOn.push(currentTile);
			}
		}

		// handle the keys pressed
		for(var key in this.keyQueue) {

			if(!this.isMoving) {

				var keyDownCode = this.keyQueue[key];
				if(keyDownCode == 39) {
					this.player.move(this, this.player.speed, 0);
					this.player.sprite = "PLAYER_RIGHT";

					this.isMoving = true;
					this.movingTimer = 4;
				}

				if(keyDownCode == 38) {
					this.player.move(this, 0, this.player.speed * -1);
					this.player.sprite = "PLAYER_UP";

					this.isMoving = true;
					this.movingTimer = 4;
				}

				if(keyDownCode == 37) {
					this.player.move(this, this.player.speed * -1, 0);
					this.player.sprite = "PLAYER_LEFT";

					this.isMoving = true;
					this.movingTimer = 4;
				}

				if(keyDownCode == 40) {
					this.player.move(this, 0, this.player.speed);
					this.player.sprite = "PLAYER_DOWN";

					this.isMoving = true;
					this.movingTimer = 4;
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
								newBomb.sprite = 'BOMB';
								newBomb.tileId = tile.identifier;
								newBomb.boomRadius = board.player.bombRadius;
								newBomb.originTile = tile;

								newBomb.timer(board, newBomb, board.player);
								board.bombs.push(newBomb);
							}
						})
					}

				}
			} else {
				this.movingTimer--;
				if(this.movingTimer == 0) {
					this.isMoving = false;
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