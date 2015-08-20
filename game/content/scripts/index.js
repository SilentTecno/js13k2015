"use strict";
(function () {
	window.onload = function () {
		var gameInstance = new game.client ({
			canvasId: '#game__canvas'
		});
		gameInstance.load();
	};
})();
