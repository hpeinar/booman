/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function tile() {
	this.identifier = 0;
	this.X = 1;
	this.Y = 1;
	this.color = '#FFF';
	this.sprite = null;
	this.isWalkable = true;
	this.isDestructable = false;
	this.isBorder = false;
	this.isDeadly = false;
	this.hasItem = null;
	this.item = null;
	this.hasBomb = null;
	this.breakWall = function(tile, color, time) {
		setTimeout(function() {
			tile.color = color;
			tile.isWalkable = true;
			tile.isDeadly = false;
			tile.sprite = 'grass';
			console.log('Changing tile color');
		}, time);
	}
	this.draw = function(canvas) {

		if(this.sprite) {
			canvas.drawImage({
				source: 'includes/images/'+ this.sprite +'.png',

				x: this.X,
				y: this.Y,

				width: config.tileSize,
				height: config.tileSize,

				fromCenter: false
			})
		} else {
			canvas.drawRect({
				x: this.X, 
				y: this.Y, 
				fillStyle: this.color,

				strokeStyle: '#000000',
				strokeWidth: 1, 
				cornerRadius: 0,

				width: config.tileSize, 
				height: config.tileSize,

				fromCenter: false
			})	
		}
		
		// draw the item if it's seeable
		if(this.hasItem == true && this.isWalkable == true) {
			this.item.draw(canvas);
		}
		//context.fillStyle = "#999999":
		//context.fillRect(X, Y, config.tileSize, config.tileSize);
	};
}