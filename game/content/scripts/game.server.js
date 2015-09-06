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
			socket.on(events.playerMovement, onPlayerMovement);
		});

		function onPlayerConnect(p) {
			//players = getArrayFromDb('players');
			var color = players.length > 0 ? 'blue' : 'green';
			if (!players.findBy('name', p.name)) {
				var newPlayer = new player();

				newPlayer.color= color;
				newPlayer.size= {width: 20, height: 20};
				newPlayer.position= {x: 0, y: 0};
				newPlayer.mass= 0.3;
				newPlayer._type= 'ship';
				newPlayer.id= p.id;
				newPlayer.name= p.name;

				players.push(newPlayer);
				//db('players', players);
			}

			io.emit(events.playerList, players);
			io.emit(events.player, newPlayer);
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

		function onPlayerMovement(playerStatus) {

			var formerPlayer = players.findBy('id', playerStatus.id);
			players.pop(formerPlayer);
			players.push(playerStatus);

			io.emit(events.playerList, players);

		}

	}

	return game;
})();

var gameInstance = new game.server();
