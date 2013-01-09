/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function player() {
	this.X = 20;
	this.Y = 20 + config.panelHeight;
	this.speed = 4;
	this.bombs = 5; // how many bombs can be places at the same time
	this.bombRadius = 2;
	this.tilesOn = new Array();
	this.deaths = 0;
	this.score = 0;
	this.sprite = 'PLAYER_DOWN';
	this.draw = function(canvas) {
		var s = new sprite();
		s.draw(this.sprite, canvas, this.X, this.Y);
	};
	this.die = function() {
		this.X = 20;
		this.Y = 20 + config.panelHeight;

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
						this.die();
					}

					// if the tile has a bomb, and player has been "off" the tile, don't let him on it
					if(currentTile.hasBomb == true && this.tilesOn.indexOf(currentTile) == -1) {
						move = false;
					}

					if(move == true && currentTile.isWalkable == true && currentTile.hasItem) {
						// tile has an item, collect it
						if(currentTile.item.type == 1) {
							board.player.bombs++;
						} else if(currentTile.item.type == 2) {
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
			board.player.X += xS;
			board.player.Y += yS;			
		})
	}
}