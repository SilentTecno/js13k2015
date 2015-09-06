var Controls = ( function() {
	var _controlsEngine = this;
	var wtf = [
		{x: 1, y: 0},
		{x: 0.40808206181339196, y: 0.9129452507276277},
		//...
	];

	function Controls() {
		controlsEngine = this;

		this.init = function (p) {

			controlsEngine.activated = p.activated || false;

			controlsEngine.postEvent = p.postEvent;

			if (controlsEngine.activated)
				window.addEventListener('keypress', function(e) {
					controlsEngine.triggerEvent(e);
					controlsEngine.postEvent();
				});
		};

		this.triggerEvent = function(e){
			var _key;
			var p = particles[0];
			// parche para firefox: el atributo <keyCode> lo rebautiza como <charCode>
			// aún falta ver cómo lo interpreta IE

			var pressedKey = e.keyCode == 0 ? e.charCode : e.keyCode;
			// console.debug(pressedKey);
			switch (pressedKey) {
				case 119:
					_key = 'up';
					p.forces.y = p.mass * -10;
					p.rotation = p.rotation == 360 ? 0 : p.rotation + 20;
					// p.forces.subtract({y: p.mass *10});
				break;
				case 97:
					_key = 'left';
					p.forces.x = p.mass * -10;
					p.rotation = p.rotation == 0 ? 360 : p.rotation - 20;
				break;
				case 115:
					_key = 'down';
					p.forces.y = p.mass * 10;
					p.rotation = p.rotation == 0 ? 360 : p.rotation - 20;
				break;
				case 100:
					_key = 'right';
					p.forces.x = p.mass * 10;
					p.rotation = p.rotation == 360 ? 0 : p.rotation + 20;
				break;
				case 107: 
					_key = 'shot';
					var wayY = p.rotation >= 0 && p.rotation <= 180 ? 1 : -1;
					var wayX = ((p.rotation >= 40 && p.rotation <= 240) || (p.rotation <= 300 && p.rotation >= 270))? -1 : 1;
					if (p.rotation >= 140 && p.rotation <= 180)
							wayX = 1;
					if (p.rotation == 360)
							wayX = -1;
					var shot = new Particle();
					shot.init({
						lifeTime: 4,
						color: 'orange',
						size: {width: 15},
						position: {x: p.position.x + p.size.width, y: p.position.y + (p.size.height/2)},
						mass: 0.5,
						forces: wtf[p.rotation/20], //{x: Math.cos(p.rotation) * (0.5 * 150) * wayX, y: Math.sin(p.rotation) * (0.5 * 150) * wayY},
						_type: 'laser',
						rotation: p.rotation,
					});
					particles.push(shot);
					console.debug(p.rotation,':',Math.cos(p.rotation), '(',wayX,')', Math.sin(p.rotation));
				break;
			};
			// if (_key)
			// 	console.debug(_key,'(',p.forces,')');
		};

	}

	return Controls;
})();