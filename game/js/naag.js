var physics_fps = 50;
var graphics_fps = 120;
var debug_mode = false;
var particles = {};
var _canvas = document.getElementById('generalCanvas');
// var number_of_particles = 3;

window.onload = function () {

	/* Esto del requestAnimFrame hay que ver dónde ponerlo luego */

	var physicsEngine = new Physics();
	var graphicsEngine = new Graphics();
	var controlsEngine = new Controls();

	physicsEngine.init({
		fps: physics_fps
	});

	graphicsEngine.init({
		fps: graphics_fps
	});

	controlsEngine.init({
		activated: true
	});

	var particle = new Particle();
	particle.init({color: 'green', size: {width: 20, height: 20}, position: {x: 0, y: 0}, mass: 0.3, _type: 'ship'});

	particles.player = particle;

	physicsEngine.animate();
	graphicsEngine.animate();

};