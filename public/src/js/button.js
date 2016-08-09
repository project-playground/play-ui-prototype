(function(window, $, undefined) {
	var ui = (window.ui === undefined) ? {} : window.ui;
	
	ui.button = {};
	
	ui.button.ready = function() {
		console.log('Hello World!!!');
	};	
	
	window.ui = ui;
}(window, jQuery));

$(document).ready(ui.button.ready);
