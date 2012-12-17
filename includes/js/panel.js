/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

function panel() {
	this.X = 0;
	this.Y = 0;
	this.draw = function(canvas, board) {
		canvas.drawText({
			fillStyle: '#000',
			font: '11px Verdana',
			text: 'Bombs: '+ board.player.bombs,

			x: this.X + 30,
			y: this.Y + 9
		})
		.drawText({
			fillStyle: '#000',
			font: '11px Verdana',
			text: 'Score: '+ board.player.score,

			x: this.X + 100,
			y: this.Y + 9
		})
		.drawText({
			fillStyle: '#000',
			font: '11px Verdana',
			text: 'Deaths: '+ board.player.deaths,

			x: this.X + 170,
			y: this.Y + 9
		})
		.drawText({
			fillStyle: '#000',
			font: '11px Verdana',
			text: 'Radius: '+ board.player.bombRadius,

			x: this.X + 240,
			y: this.Y + 9
		});
	}
}