/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function item() {
	this.X = 0;
	this.Y = 0;
	this.color = '#3a9dc2';
	this.type = 0; // item type for use inside the system
	this.name = ''; // name for reference
	this.sprite = null;
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
				fillStyle: this.color,
				x: this.X,
				y: this.Y,

				height: Math.floor(config.tileSize / 1.4),
				width: Math.floor(config.tileSize / 1.4),

				fromCenter: false
			});
		}
	}
}