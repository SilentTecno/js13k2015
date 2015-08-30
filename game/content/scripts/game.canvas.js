"use strict";
var game = game || {};
game.canvas = (function (){
	var canvasElement = null,
		cols = 0,
		rows = 0;

	var canvas = function (p){
		if(p){
			if(p.canvas){
				canvasElement = p.canvas;
			}
		}
		this.init = function (){
			setCanvasSize(canvasElement);
		};
		this.setGrid = function(pCols, pRows) {
			cols = pCols;
			rows = pRows;
			console.log(cols + ' '+ rows);
		};
	};

	function setCanvasSize(canvas) {
		if (canvas) {
			var limits = game.helpers.getBrowserLimits();
			canvas.width = (limits.width * 0.9) - 2;
			canvas.height = (limits.height * 0.9) - 2;
			canvas.style.marginLeft = (limits.width * 0.05) + 'px';
			canvas.style.marginTop = (limits.height * 0.05) + 'px';
		}
	}

	return canvas;
})();
