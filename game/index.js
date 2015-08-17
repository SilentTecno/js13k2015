"use strict";
(function () {
	window.onload = function () {
		var gameObject = new game({
			canvasId: '#game__canvas'
		});
		gameObject.load();
	};
})();
