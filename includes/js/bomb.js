/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/
function bomb() {
	this.tileId = 0;
	this.X = 0;
	this.Y = 0;
	this.timerText = '3';
	this.boomTime = 3;
	this.boomRadius = 2;
	this.originTile = null;
	this.spreading = false;
	this.sprite = null;
	this.spreadFire = function(board, tile, player) {
		if(tile) {
			this.spreading = true;
			if(this.spreading && !tile.isBorder) {
				tile.sprite = 'FIRE';
				tile.isDeadly = true;
				tile.breakWall(tile, '#FFF', 1000);

				// check if player is on any of the tiles, if so, kill the player
				for(var playerTile in player.tilesOn) {
					if(player.tilesOn[playerTile] === tile) {
						player.die();
					}
				}

				// it was a breakable wall, add points
				if(tile.isDestructable == true) {
					this.spreading = false;
					player.score++;
				}

				// this tile had a bomb, we need to make the other bomb go off too (chain reaction)
				if(tile.hasBomb == true) {
					console.log("Has bomb tileID is "+ tile.identifier);
					for(var bomb in board.bombs) {
						if(board.bombs[bomb].tileId == tile.identifier) {
							board.bombs[bomb].boomTime = 0; // this sets the bomb off
						}
					}
				}

				tile.isDestructable = false;
			}
		}
	}
	this.lowerTimer = function(board, bomb, interval, player) {
		console.log('Bomb timer!');
		bomb.boomTime--;
		bomb.sprite = 'BOMB_'+ (3 - bomb.boomTime);
		bomb.timerText = bomb.boomTime;
		
		if(bomb.boomTime <= 0) {
			// bomb goes BOOM
			player.bombs++;
			bomb.originTile.color = '#F0F';
			bomb.originTile.breakWall(bomb.originTile, '#FFF', 1000);
			bomb.originTile.hasBomb = false;

			// take the bomb off drawList from board
			var bombIndex = board.bombs.indexOf(bomb);

			if(bombIndex != -1 ) {
				board.bombs.splice(bombIndex, 1);				
			}

			// spread the fire, hitting an destructable tile will stop the spread
			// spread fire up
			for(var i = 1;i <= bomb.boomRadius;i++) {
				board.getTile(board, bomb.originTile.X, bomb.originTile.Y - config.tileSize * i, function(tile) {
					bomb.spreadFire(board, tile, player);
				});
			}

			// spread fire left
			for(var i = 1;i <= bomb.boomRadius;i++) {
				board.getTile(board, bomb.originTile.X - config.tileSize * i, bomb.originTile.Y, function(tile) {
					bomb.spreadFire(board, tile, player);
				});
			}			

			// spread fire down
			for(var i = 1;i <= bomb.boomRadius;i++) {
				board.getTile(board, bomb.originTile.X, bomb.originTile.Y + config.tileSize * i, function(tile) {
					bomb.spreadFire(board, tile, player);
				});
			}

			// spread fire right
			for(var i = 1;i <= bomb.boomRadius;i++) {
				board.getTile(board, bomb.originTile.X + config.tileSize * i, bomb.originTile.Y, function(tile) {
					bomb.spreadFire(board, tile, player);
				});
			}
			

			clearInterval(interval);
		}	
	}
	this.timer = function(board, bomb, player) {
		var bombInterval = setInterval(function() {
			bomb.lowerTimer(board, bomb, bombInterval, player);
		}, 1000)
	}
	this.draw = function(canvas) {
		var s = new sprite();
		s.draw(this.sprite, canvas, this.X, this.Y);
	}
}