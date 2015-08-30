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
	},
	Array: function(){
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

		if (!Array.prototype.find) {
			Array.prototype.find = function(predicate) {
				if (this == null) {
					throw new TypeError('Array.prototype.find called on null or undefined');
				}
				if (typeof predicate !== 'function') {
					throw new TypeError('predicate must be a function');
				}
				var list = Object(this);
				var length = list.length >>> 0;
				var thisArg = arguments[1];
				var value;

				for (var i = 0; i < length; i++) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return value;
					}
				}
				return undefined;
			};
		}

		Array.prototype.findBy = function(property, value){
			var list = Object(this);
			var length = list.length >>> 0;
			var item;

			for(var i = 0; i < length; i++) {
				item = list[i];
				if (item[property] == value) {
					return item;
				}
			}

			return undefined;
		};

		return Array;
	},
	Object: function(){
		if(!Object.prototype.extend) {
			Object.prototype.extend = function (obj) {
				for (var i in obj) {
					if (obj.hasOwnProperty(i)) {
						this[i] = obj[i];
					}
				}
			};
		}
		return Object;
	}
};

if (typeof module !== "undefined") {
    module.exports = game.helpers;
}
else {
	/*Array = game.helpers.Array(Array);
	Object = game.helpers.Object(Object);*/

	// requestAnimFrame
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function (callback) {
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
}
