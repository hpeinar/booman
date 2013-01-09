/* Boomman v0.1
Written by Henrik Peinar
http://projekt406.ee/codeblog
17.12.2012
*/

$(document).ready(function() {
	// clicking anywhere will give the canvas focus
	$('body').click(function(e) {
		$('#mainCanvas').focus();
	})

	var game = new gameBoard();

	// we need to queue up all the clicks we get from the client
	$('body').keydown(function(e) {
		if(game.keyQueue.indexOf(e.keyCode) == -1) {
			game.keyQueue.push(e.keyCode);
		}
	})

	$('body').keyup(function(e) {
		if(game.keyQueue.indexOf(e.keyCode) != -1 ) {
			game.keyQueue.splice(game.keyQueue.indexOf(e.keyCode), 1);				
		}
	})
	
	game.init(function() {
		game.bind(game, function() {

			setInterval(function() {
				game.update(function() {
					game.draw();
				});
			}, 25);

		})

	})
})

// stop the scrolling!
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
};