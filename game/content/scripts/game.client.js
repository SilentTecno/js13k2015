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
			events = thatGame.events;

		this.load = function () {
			initWelcome();
			canvasHelper.init(limits);
		};

		function initWelcome(){
			var playerName = sessionStorage["playerName"];
			if(thatGame.helpers.isEmpty(playerName)) {
				$('.game__welcome')[0].style.display = 'flex';
				$('.game__welcome__text')[0].focus();
				$('.game__welcome__button')[0].onclick = joinClick;
			}
			else {
				$('.game__welcome')[0].style.display = 'none';
				connect(playerName);
			}
		}

		function joinClick(){
			var playerName = $('.game__welcome__text')[0].value;
			var validateNameRegex = new RegExp(/\w+/g);
			if(validateNameRegex.test(playerName)) {
				sessionStorage["playerName"] = playerName;
				connect(playerName);
			}
			else {
				alert('Player Name not valid.');
			}

		}

		function connect(playerName) {
			console.log('connecting...');
			if (!socket.conected || socket.conected === false) {
				socket = io(document.location.href);
			}
			socket.emit(events.playerConnect, { name: playerName });
			socket.on(events.playerWelcome, onPlayerWelcome);
			socket.on(events.playerList, onPlayerList)

		}

		function onPlayerWelcome(p){
			connected = true;
			console.log('onPlayerWelcome');
			console.log(p)
		}

		function onPlayerList(list){
			console.log('onPlayerList');
			console.log(list);
		}

		function generatePlayerName(){
			return 'Player '+ Math.random().toString().replace(/.*\./,'');
		}
	};

	return game;
})();
