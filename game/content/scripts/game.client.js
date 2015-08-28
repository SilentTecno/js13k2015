"use strict";
var game = game || {},
	thatGame = game;

game.client = (function (){
	var that = this,
		canvasHelper = null,
		socket = {},
		connected = false;

	var game = function (p) {
		if(p) {
			if(p.canvasId) {
				canvasHelper = new thatGame.canvas({ 'canvas' : $(p.canvasId) });
			}
		}

		var limits = thatGame.helpers.getBrowserLimits(),
			events = thatGame.events,
			thisGame = this;

		this.players = [];
		this.gameInfo = {};
		this.connected = false;

		this.load = function () {
			initWelcome();
			canvasHelper.init(limits);
		};

		this.disconnect = function() {
			socket.disconnect();
			thisGame.playerName = '';
			connected = false;
		};

		function initWelcome(){
			var playerName = sessionStorage["playerName"];
			thisGame.playerName = playerName;

			if (thatGame.helpers.isEmpty(playerName)) {
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
				thisGame.playerName = playerName;
				connect();
			}
			else {
				alert('Player Name not valid.');
			}

		}

		function connect() {
			console.log('connecting...');
			if (!socket.conected || socket.conected === false) {
				socket = io(document.location.href);
			}

			socket.on(events.playerWelcome, onPlayerWelcome);
			socket.on(events.playerList, onPlayerList);
			socket.on(events.gameInfo, onGameInfo);
		}

		function onPlayerWelcome(p){
			console.log(events.playerConnect);
			connected = true;
			socket.emit(events.playerConnect, { 'id': p.id, 'name': sessionStorage["playerName"] });
		}

		function onPlayerList(list){
			console.log(events.playerList);
			thisGame.players = list;
		}

		function onGameInfo(g) {
			console.log(events.gameInfo);
			thisGame.gameInfo = g;
		}

		function generatePlayerName(){
			return 'Player '+ Math.random().toString().replace(/.*\./,'');
		}
	};

	return game;
})();
