/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

// predefined sprites, NAME = [yRow, xPos]
var sprites = {};
sprites['BOMB'] = [1, 1];
sprites['BOMB_1'] = [1, 2];
sprites['BOMB_2'] = [1, 3];
sprites['BOMB_BONUS'] = [1, 4];
sprites['RADIUS_BONUS'] = [1, 5];
sprites['FIRE'] = [1, 6];
sprites['FIRE_CENTER'] = [2, 6];
sprites['GRASS'] = [1, 7];
sprites['PLAYER_DOWN'] = [1, 8];
sprites['PLAYER_LEFT'] = [1, 9];
sprites['PLAYER_RIGHT'] = [1, 10];

sprites['PLAYER_UP'] = [2, 1];
sprites['WALL'] =  [2, 2];
sprites['BREAKABLE_WALL'] = [2, 3];

function sprite() {
	this.sheet = 'includes/images/'+ config.spriteSheet;
	this.tileSize = config.tileSize;
	// draws an sprite to given location
	this.draw = function(spriteName, board, canvas, drawX, drawY, rotation, shadow, shadowY) {
		// see if the sprite fits into camera view
		if(drawX < board.camera.X || drawX > board.camera.X + board.camera.width) {
			return;
		}

		if(drawY < board.camera.Y || drawY > board.camera.Y + board.camera.height) {
			return;
		}

		drawX -= board.camera.X;
		drawY -= board.camera.Y - config.panelHeight;

		if(!rotation) {
			rotation = 0;
		}

		if(!shadow) {
			shadow = false;
		}

		// get sprite
		if(spriteName in sprites) {
			var drawable = sprites[spriteName];	

			canvas.drawImage({
				source: this.sheet,

				shadowColor: (shadow == true) ? "#333" : '',
  			shadowBlur: (shadow == true) ? 4 : 0,
  			shadowX: (shadow == true) ? 0 : 0,
			  shadowY: (shadow == true) ? shadowY : 0,

				sx: (drawable[1] * config.tileSize) - config.tileSize,
				sy: (drawable[0] * config.tileSize) - config.tileSize,

				rotate: rotation,

				x: drawX,
				y: drawY,

				sWidth: config.tileSize,
				sHeight: config.tileSize,

				width: config.tileSize,
				height: config.tileSize,

				fromCenter: false,
				cropFromCenter: false
			})
		} else {
			canvas.drawRect({
				x: drawX, 
				y: drawY, 
				fillStyle: '#990000',

				strokeStyle: '#000000',
				strokeWidth: 1, 
				cornerRadius: 0,

				width: config.tileSize, 
				height: config.tileSize,

				fromCenter: false
			})
		}
			
	}
}