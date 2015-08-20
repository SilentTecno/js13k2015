var Controls = ( function() {
	var _controlsEngine = this;

	function Controls() {
		controlsEngine = this;

		this.init = function (p) {

			controlsEngine.activated = p.activated || false;

			if (controlsEngine.activated)
				window.addEventListener('keypress', function(e) {controlsEngine.triggerEvent(e);});
		};

		this.triggerEvent = function(e){
			var _key;
			var p = particles.player;
			// parche para firefox: el atributo <keyCode> lo rebautiza como <charCode>
			// aún falta ver cómo lo interpreta IE

			var pressedKey = e.keyCode == 0 ? e.charCode : e.keyCode;
			// switch (e.keyCode) {
			switch (pressedKey) {
				case 119:
					_key = 'up';
					p.forces.y = p.mass * -10;
					p.rotation += 20;
					// p.forces.subtract({y: p.mass *10});
				break;
				case 97:
					_key = 'left';
					// p.forces.subtract({x: p.mass * 10});
					p.forces.x = p.mass * -10;
				break;
				case 115:
					_key = 'down';
					p.forces.y = p.mass * 10;
				break;
				case 100:
					_key = 'right';
					// p.forces.add({x: p.mass * 10});
					p.forces.x = p.mass * 10;
				break;
			};
			if (_key)
				console.debug(_key,'(',p.forces,')');
		};

	}

	return Controls;
})();