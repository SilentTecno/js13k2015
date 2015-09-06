"use strict";
var game = game || {},
	thatG = game,
	_canvas,
	particles;

game.client = (function (){
	var thatC = this;

	var game = function (p) {
		var thisG = this;

		var physics_fps = 50;
		var graphics_fps = 120;
		var debug_mode = false;
		particles = [];

		this.players = [];
		this.gameInfo = {};
		this.connected = false;
		this.canvas = {};
		this.socket = {};

		if(p) {
			if(p.canvasId) {
				thisG.canvas = new thatG.canvas({ 'canvas' : $(p.canvasId) });
			}
		}

		var limits = thatG.helpers.getBrowserLimits(),
			events = thatG.events;

		this.load = function () {
			initWelcome();
			thisG.canvas.init(limits);
			_canvas = thisG.canvas.canvasElement;
			// naag();
		};

		this.disconnect = function() {
			thisG.socket.disconnect();
			thisG.playerName = '';
			thisG.connected = false;
		};

		function initWelcome(){
			var playerName = sessionStorage["playerName"];
			thisG.playerName = playerName;

			if (thatG.helpers.isEmpty(playerName)) {
				$('.game__welcome')[0].style.display = 'flex';
				$('.game__welcome__text')[0].focus();
				$('.game__welcome__button')[0].onclick = joinClick;
			}
			else {
				$('.game__welcome')[0].style.display = 'none';
				connect();
			}
		}

		function joinClick(){
			var playerName = $('.game__welcome__text')[0].value;
			var validateNameRegex = new RegExp(/\w+/g);
			if(validateNameRegex.test(playerName)) {
				$('.game__welcome')[0].style.display = 'none';
				sessionStorage["playerName"] = playerName;
				thisG.playerName = playerName;
				connect();
			}
			else {
				alert('Player Name not valid.');
			}
		}

		function connect() {
			console.log('connecting...');
			if (!thisG.socket.conected || thisG.socket.conected === false) {
				//thisG.socket = io(document.location.href.toString().replace('.dev.', '.'));
				thisG.socket = io('');
				thisG.socket.connect();
			}

			thisG.socket.on(events.playerWelcome, onPlayerWelcome);
			thisG.socket.on(events.playerList, onPlayerList);
			thisG.socket.on(events.gameInfo, onGameInfo);
			thisG.socket.on(events.player, onPlayer);
		}

		function onPlayer(player) {
			console.log(player);
		}

		function onPlayerWelcome(p){
			console.log(events.playerConnect);
			thisG.connected = true;
			thisG.socket.emit(events.playerConnect, { 'id': p.id, 'name': sessionStorage["playerName"] });
			naag();
		}

		function onPlayerList(list){
			console.log(events.playerList);
			// if (particles.length == 0)
				// naag();
			particles = [];
			for (var p = 0; p < list.length; p++) {
				var particle = new Particle();
				particle.init(list[p]);
				particles.push(particle);
			}
		}

		function onGameInfo(g) {
			console.log(events.gameInfo);
			thisG.gameInfo = g;
			thisG.canvas.setGrid(g.dimension.cols, g.dimension.rows);
		}

		function generatePlayerName(){
			return 'Player '+ Math.random().toString().replace(/.*\./,'');
		}

		function naag() {
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
				activated: true,
				postEvent: onPostEvent
			});

			// var particle = new Particle();
			// particle.init({color: 'green', size: {width: 20, height: 20}, position: {x: 0, y: 0}, mass: 0.3, _type: 'ship'});

			// particles.push(particle);

			physicsEngine.animate();
			graphicsEngine.animate();
		}

		function onPostEvent() {
			var particle = new Particle();
			var me = particles.findBy('id', thisG.socket.id);
			particle.init(me);

			thisG.socket.emit(events.playerMovement, particle);
		}
	};

	return game;
})();