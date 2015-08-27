"use strict";
(function () {
	window.onload = function () {
		window.$g = new game.client ({
			canvasId: '#game__canvas'
		});
		window.$g.load();
	};
})();
