"use strict";
var events = require('./game.events.js'),
    game = game || {};

game.server = (function (){
	function game(){
		var io = require('sandbox-io'),
				players = [],
                thisSocket = null;

		log.debug(events);

		io.on('connection', function(socket) {
            thisSocket = socket;
			log.debug('New Connection ' + socket.id);
			socket.emit(events.playerWelcome, { 'id':socket.id });
			socket.on(events.playerConnect, onPlayerConnect);
		});

		function onPlayerConnect(p, socket) {
			players = db('players') || [];
			if (!players[p.name]) {
				players.push(p.name);
				db('players', players);
			}
            thisSocket.emit(events.playerList, { players: players });
		}

		function setPlayerInfo(player) {
			log.debug(player);
		}

	}

	return game;
})();

var gameInstance = new game.server();
