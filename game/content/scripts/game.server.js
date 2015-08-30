"use strict";
var game = game || {};
var events = require('./game.events.js');
var helpers = require('./game.helpers.js');
var player = require('./game.player.js');

Array = helpers.Array();
Object = helpers.Object();

game.server = (function (){
	function game(){
		var io = require('sandbox-io'),
				players = new Array(),
                thisSocket = null,
				gameDimension = {'cols': 4, 'rows': 3};


		io.on('connection', function(socket) {
            thisSocket = socket;
			log.debug('New Connection ' + socket.id);

			socket.emit(events.playerWelcome, { 'id':socket.id });
			socket.emit(events.gameInfo, {'dimension': gameDimension});
			socket.on(events.playerConnect, onPlayerConnect);
			socket.on('disconnect', function () { onDisconnect(socket); } );
		});

		function onPlayerConnect(p) {
			//players = getArrayFromDb('players');
			if (!players.findBy('id', p.id)) {
				var pObj = new player();
				pObj.id = p.id;
				pObj.name = p.name;
				players.push(pObj);
				//db('players', players);
			}

			io.emit(events.playerList, players);
			log.debug(players);
		}

		function onDisconnect(socket) {
			var playerDisconnected = players.findBy('id', socket.id);
			if (playerDisconnected) {
				players.pop(playerDisconnected);
				io.emit(events.playerList, players);
				log.debug('Player disconnected ' + socket.id);
			}
			else {
				log.debug('Player not found ' + socket.id);
			}
		}

		function getArrayFromDb(array){
			var playersTmp = db(array) || [];
			playersTmp = Array.prototype.slice.call(playersTmp);
			return playersTmp;
		}

	}

	return game;
})();

var gameInstance = new game.server();
