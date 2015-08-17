"use strict";
var game = (function (){
	var that = this,
		canvasHelper = null

	var game = function (p) {
		if(p) {
			if(p.canvasId) {
				canvasHelper = new game.canvas({'canvas':$(p.canvasId)});
			}
		}

		this.load = function () {
			canvasHelper.init();
		};

	}
	return game;
})();



