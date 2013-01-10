/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

// this function is ment to create and 
function floatingText() {
	this.text = '';
	this.X = 0;
	this.Y = 0;
	this.color = '#fff';

	this.opacity = 1;

	this.draw = function(canvas, board) {
		// before drawing, move and fade the text

		if(this.opacity > 0.1) {
			this.opacity -= 0.05;

			console.log(this.opacity);
			if(this.opacity >= 0.1) {
				this.Y -= 1;
			}

			canvas.drawText({
				fillStyle: this.color,
				strokeStyle: this.color,
				strokeWidth: 1,
				x: this.X,
				y: this.Y,
				font: '12pt Verdana',
				text: this.text,
				opacity: this.opacity
			});
		} else {
			var floatIndex = board.floatingTexts.indexOf(this);

			if(floatIndex != -1 ) {
				board.floatingTexts.splice(floatIndex, 1);				
			}
		}
	}
}