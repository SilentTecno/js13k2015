var Graphics = (function () {
	var graphicsEngine = this;

	var graphicsClock = function(f) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f, 1000/window.graphics_fps);
		}

	}();

	var beginning
		,context
		,dt
		,fps
		,frames
		,interval
		,now
		,then;

	function Graphics() {
		graphicsEngine = this;

		this.init = function (p) {

			fps = p.fps;
			interval = 1000/fps;
			then = beginning = Date.now();
			frames = 0;
			context = _canvas.getContext('2d');

		}

		this.animate = function() {
			graphicsClock(graphicsEngine.animate);

			now = Date.now();

			var delta = now - then;

			if (delta > interval) {

				then = now - (delta % interval);

				/*
				A partir de aquí inicia nuestro experimento de gravedad
				*/

				// if (window.debug_mode == true) {
				// 	var tiempo_trans = (then - beginning) / 1000;
				// 	document.getElementById('graphics_fps').innerHTML = 'Graphics: ' + (++frames) + "f / " + parseInt(tiempo_trans) + "s = " + parseInt(frames / tiempo_trans) + "fps";
				// }

				graphicsEngine.draw();

			}

		}

		this.draw = function() {

			clear();

			for (var i in particles)
				particles[i].draw(context);

		}

		this.dq = function (p) {
			var search = null;
			if (p && typeof p === 'string') {
				if (p.length > 1) {
					if (p[0] === '#') {
						search = p.substring(1, p.length);
						return document.getElementById(search);
					}
					else if (p[0] === '.') {
						search = p.substring(1, p.length);
						return document.getElementsByClassName(search);
					}
					else {
						return document.getElementsByTagName(p);	
					}
				}
				else if (p.length > 0) {
					return document.getElementsByTagName(p);
				}
			}
		}

		this.initCanvas = function() {
		}

	}

	function clear() {
		context.clearRect(0, 0, _canvas.width, _canvas.height);
	}

	return Graphics;
})();