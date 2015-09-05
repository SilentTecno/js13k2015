var Physics = ( function () {
	var physicsEngine = this;

	var physicsClock = function(f) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f, 1000/window.physics_fps);
		}

	}();

	var beginning
		,dt
		,fps
		,frames
		,interval
		,now
		,then;

	function Physics() {
		physicsEngine = this;

		this.init = function (p) {
			fps = p.fps;
			interval = 1000/fps;
			dt = fps/1000;
			then = beginning = Date.now();
			frames = 0;
		}

		this.animate = function() {

			physicsClock(physicsEngine.animate);

			now = Date.now();

			var delta = now - then;

			if (delta > interval) {

				then = now - (delta % interval);


				for (var i in particles) {

					var p = particles[i];

					// (física en eje vertical)

					// if (!p.grounded.y) { // esta validación solía estar para controlar universos "finitos"

						// descomenta le línea de abajo para incluir al contante de la gravedad... ¡Aguas!
						// p.forces.add({y: p.mass * 9.18 / 60});

						// aquí se usa algo llamado velvet integration (o integración velvet) para dar sentido de aceleración gradual
						var dy = p.velocity.y * dt + (0.5 * p.acceleration.y * Math.pow(dt, 2));

						p.position.add({y: dy * 10});

						var old_ay = p.acceleration.y;

						p.acceleration.set({y: p.forces.y / p.mass});

						var avg_ay = 0.5 * (old_ay + p.acceleration.y);

						// cruiseVelocity (he de indagar por el término correcto aplicado en física)
						// sirve para indicar cuando al partícula ha llegado a su velocidad tope, enla cuál
						// debe dejar de acelerar
						if ( (p.forces.y > 0 && p.cruiseVelocity > p.velocity.y) || (p.forces.y < 0 && (p.cruiseVelocity*-1) < p.velocity.y) )
							p.velocity.add({y: avg_ay * dt});

						if ( p.position.y + (p.size.height/2) > _canvas.height && p.velocity.y > 0) // evaluamos si no le hemos dado ya la "vuelta a la galaxia"
							p.position.y = -p.size.height/2;
						else if (p.position.y < (p.size.height/2 * -1)) {
							p.position.y = _canvas.height - (p.size.height/2);
						}

					// }

					// (física en eje horizontal)

					// if (!p.grounded.x) { // esta validación solía estar para controlar universos "finitos"

						var dx = p.velocity.x * dt + (0.5 * p.acceleration.x * Math.pow(dt, 2));

						p.position.add({x: dx * 10});

						var old_ax = p.acceleration.x;

						p.acceleration.set({x: p.forces.x / p.mass});

						var avg_ax = 0.5 * ( old_ax + p.acceleration.x);

						// misma indicación que en <y>: solo aceleramos si no hemos alcanzado ya la "velocidad crucero"
						// if (p.cruiseVelocity > Math.abs(p.velocity.x))
						if ( (p.forces.x > 0 && p.cruiseVelocity > p.velocity.x) || (p.forces.x < 0 && (p.cruiseVelocity*-1) < p.velocity.x) )
							p.velocity.add({x: avg_ax * dt});

						if (p.position.x + (p.size.width/2) > _canvas.width && p.velocity.x > 0) // evaluamos si no le hemos dado ya la "vuelta a la galaxia" desde el otro eje
							p.position.x = -p.size.width/2;
						else if (p.position.x < (p.size.width/2 * -1))
							p.position.x = _canvas.width - (p.size.width/2);

					// }

				}

				if (window.debug_mode) {
					var tiempo_trans = (then - beginning) / 1000;
					document.getElementById('physics_fps').innerHTML = 'Physics: ' + (++frames) + "f / " + parseInt(tiempo_trans) + "s = " + parseInt(frames / tiempo_trans) + "fps";
				}

			}

		}

	}

	return Physics;
})();