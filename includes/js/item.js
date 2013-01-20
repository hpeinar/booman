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
	this.floating = true;
	this.floatingY = 1;
	this.floatingSpeed = 0.1;
	this.draw = function(board, canvas) {
		// if it's floating, move it a bit
		if(this.floating) {
			this.floatingY += this.floatingSpeed;
		}

		if(this.floatingY >= 5 || this.floatingY <= 0) {
			this.floatingSpeed *= -1;
		}

		var s = new sprite();
		s.draw(this.sprite, board, canvas, this.X, this.Y - this.floatingY, 0, false, (5 + this.floatingY));
	}
}