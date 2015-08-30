'use strict';
var game = game || {};
game.player = (function() {
    var player = function(s) {
        if(s) {
            this.socket = s;
        }
        this.id = 0;
        this.name = '';
    };

    return player;
})();

if (typeof module !== "undefined") {
    module.exports = game.player;
}
