"use strict";
var game = game || {};
game.helpers = {
		getBrowserLimits: function() {
			var documentElement = document.documentElement,
				bodyElement = $('body')[0],
				layoutWidth = window.innerWidth || documentElement.clientWidth || bodyElement.clientWidth,
				layoutHeight = window.innerHeight || documentElement.clientHeight || bodyElement.clientHeight;
			return {width: layoutWidth, height: layoutHeight};
		},
		isEmpty: function(object) {
			return (typeof object === "undefined" || object === null || object === "" );
		}
};

if (typeof module !== "undefined") {
    module.exports = game.helpers;
}

// requestAnimFrame
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// dom searcher
var $ = (function(){
	function dq (p) {
		var search = null;
		if (p && typeof p === 'string') {
			if (p.length > 1) {
				if (p[0] === '#') {
					search = p.substring(1, p.length);
					return document.getElementById(search);
				}
				else if (p[0] === '.') {
					search = p.substring(1, p.length);
					return document.getElementsByClassName(search);
				}
				else {
					return document.getElementsByTagName(p);
				}
			}
			else if (p.length > 0) {
				return document.getElementsByTagName(p);
			}
		}
	}
	return dq;
})();

//
if(!Array.prototype.exists) {
	Array.prototype.exists = function (obj) {
		var result = false,
			resultItem = false,
			i = 0,
			t = 0,
			name = null;
		for (i = 0, t = this.length; i < t; i++) {
			resultItem = true;
			for (name in obj) {
				if (typeof this[i][name] !== 'undefined' && typeof obj[name] !== 'undefined') {
					if (this[i][name] !== obj[name]) {
						resultItem = false;
						break;
					}
				}
			}
			if (resultItem) {
				result = resultItem;
				break;
			}
		}
		return result;
	};
}

Object.prototype.extend = function(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			this[i] = obj[i];
		}
	}
};
