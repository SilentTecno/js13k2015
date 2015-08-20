var Vector = (function () {

	function vector(v) {
		this.x = v.x || 0;
		this.y = v.y || 0;
	}

	vector.prototype.set = function (v) {
		this.x = v.x || 0;
		this.y = v.y || 0;
	}

	vector.prototype.add = function (v) {
		this.x += v.x || 0;
		this.y += v.y || 0;
	}

	vector.prototype.subtract = function(v) {
		this.x -= v.x || 0;
		this.y -= v.y || 0;
	}

	vector.prototype.debug = function() {
		console.debug(this);
	}

	return vector;
})();