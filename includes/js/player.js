/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function player() {
	this.X = 20;
	this.Y = 20 + config.panelHeight;
	this.speed = 20;
	this.bombs = 5; // how many bombs can be places at the same time
	this.bombRadius = 2;
	this.tilesOn = new Array();
	this.deaths = 0;
	this.score = 0;
	this.sprite = 'PLAYER_DOWN';
	this.draw = function(board, canvas) {
		var s = new sprite();
		s.draw(this.sprite, board, canvas, this.X, this.Y);
	};
	this.randomSpawn = function(board) {
		var xMax = 20 - 2; // minus wall tiles
		var yMax = 20 - 2;

		var xStart = 1;
		var yStart = 1;

		// get randoms
		var xRand = Math.floor(Math.random() * (xMax)) + xStart;
		var yRand = Math.floor(Math.random() * (yMax)) + yStart;

		var spawnTileX = xRand * config.tileSize;
		var spawnTileY = yRand * config.tileSize + config.panelHeight;

		var that = this;
		board.getTile(board, spawnTileX, spawnTileY, function(tile) {
			if(tile.sprite == 'GRASS') {
				that.X = spawnTileX;
				that.Y = spawnTileY;
			} else {
				that.randomSpawn(board);
			}
		});
	};
	this.die = function(board) {
		var floater = new floatingText();
		floater.text = '+1 death';
		floater.color = '#900';
		floater.X = this.X - 5;
		floater.Y = this.Y - 10;
		board.floatingTexts.push(floater);
		board.camera.X = 0;
		board.camera.Y = 0 + config.panelHeight;
		this.randomSpawn(board);

		this.deaths++;
	};
	this.plantBomb = function(board, cb) {
		var playerX = this.X;
		var playerY = this.Y;

		var playerFarX = playerX + config.tileSize;
		var playerFarY = playerY + config.tileSize;

		// player must stand on 1 tile to place a bomb
		//if(this.tilesOn.length == 1) {
			var bombTile = this.tilesOn[0];
			board.getTile(board, bombTile.X, bombTile.Y, function(tile) {
				if(tile) {
					if(tile.hasBomb != true) {
						tile.hasBomb = true;
						cb(tile);	
					} else {
						return null;
					}
				} else {
					return null;
				}
			})
		//}
	};
	this.canMove = function(board, xSpeed, ySpeed, cb) {
		// first move player "hypothetically" and check if it would go onto a non-walkable tile, if not, really move the player
		var playerX = this.X + xSpeed;
		var playerY = this.Y + ySpeed;

		var playerFarX = playerX + (config.tileSize - 1);
		var playerFarY = playerY + (config.tileSize - 1);

		var move = true;

		// loop thru all the tiles, check if tile is 
		for(var tile in board.tiles) {
			var currentTile = board.tiles[tile];
			
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

					// player interacts with this tile from one of it's corners
					if(currentTile.isWalkable == false) {
						move = false;
					}

					// is the tile deadly?
					if(currentTile.isDeadly == true) {
						this.die(board);
					}

					// if the tile has a bomb, and player has been "off" the tile, don't let him on it
					if(currentTile.hasBomb == true && this.tilesOn.indexOf(currentTile) == -1) {
						move = false;
					}

					if(move == true && currentTile.isWalkable == true && currentTile.hasItem) {
						// tile has an item, collect it
						if(currentTile.item.type == 1) {
							// generate a floating text there
							var floater = new floatingText();
							floater.text = '+1 bomb';
							floater.X = currentTile.X - board.camera.X;
							floater.Y = currentTile.Y - board.camera.Y + config.panelHeight;
							board.floatingTexts.push(floater);

							board.player.bombs++;
						} else if(currentTile.item.type == 2) {
							var floater = new floatingText();
							floater.text = '+1 radius';
							floater.X = currentTile.X - board.camera.X;
							floater.Y = currentTile.Y - board.camera.Y + config.panelHeight;
							board.floatingTexts.push(floater);

							board.player.bombRadius++;
						}

						currentTile.item = null;
						currentTile.hasItem = null;
					}
			}
		}

		if(move) {
			cb(xSpeed, ySpeed); 
		} else {
			cb(0, 0);
		}

	}
	this.move = function(board, xSpeed, ySpeed) {

		this.canMove(board, xSpeed, ySpeed, function(xS, yS) {

			var cameraSpeed = 1;
			// move camera
			if(board.player.X >= board.camera.X + board.camera.width - (4 * config.tileSize) && xS > 0) {
				board.camera.move(board, cameraSpeed, 0);
			}

			if(board.player.Y >= board.camera.Y + board.camera.height - (4 * config.tileSize) && yS > 0) {
				board.camera.move(board, 0, cameraSpeed);
			}

			if(board.player.X <= board.camera.X + (4 * config.tileSize) && xS < 0) {
				board.camera.move(board, cameraSpeed * -1, 0);
			}

			if(board.player.Y <= board.camera.Y + (4 * config.tileSize) && yS < 0) {
				board.camera.move(board, 0, cameraSpeed * -1);
			}

			


			board.player.X += xS;
			board.player.Y += yS;
		})
	}
}