"use strict";
var game = game || {};
game.events = {
    playerConnect: 'player_connect',
    newPlayer: 'new_player',
    playerWelcome: 'player_welcome',
    playerList: 'player_list',
    gameInfo: 'game_info',
    player: 'player',
    playerMovement: 'playerMovement'
};

if (typeof module !== "undefined") {
    module.exports = game.events;
}