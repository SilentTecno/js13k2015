"use strict";
var game = game || {},
	thatG = game;

game.client = (function (){
	var thatC = this;

	var game = function (p) {
		var thisG = this;

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
		}

		function onPlayerWelcome(p){
			console.log(events.playerConnect);
			thisG.connected = true;
			thisG.socket.emit(events.playerConnect, { 'id': p.id, 'name': sessionStorage["playerName"] });
		}

		function onPlayerList(list){
			console.log(events.playerList);
			thisG.players = list;
		}

		function onGameInfo(g) {
			console.log(events.gameInfo);
			thisG.gameInfo = g;
			thisG.canvas.setGrid(g.dimension.cols, g.dimension.rows);
		}

		function generatePlayerName(){
			return 'Player '+ Math.random().toString().replace(/.*\./,'');
		}
	};

	return game;
})();