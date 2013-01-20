/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function tile() {
	this.identifier = 0;
	this.X = 1;
	this.Y = 1;
	this.sprite = null;
	this.isWalkable = true;
	this.isDestructable = false;
	this.isBorder = false;
	this.isDeadly = false;
	this.hasItem = null;
	this.item = null;
	this.hasBomb = null;
	this.rotation = 0;
	this.breakWall = function(tile, color, time) {
		setTimeout(function() {
			tile.color = color;
			tile.isWalkable = true;
			tile.isDeadly = false;
			tile.sprite = 'GRASS';
		}, time);
	}
	this.draw = function(board, canvas) {
		if(this.sprite != 'GRASS') {
			var s = new sprite();
			s.draw(this.sprite, board, canvas, this.X, this.Y, this.rotation);
		}
		
		// draw the item if it's seeable
		if(this.hasItem == true && this.isWalkable == true) {
			this.item.draw(board, canvas);
		}
		//context.fillStyle = "#999999":
		//context.fillRect(X, Y, config.tileSize, config.tileSize);
	};
}