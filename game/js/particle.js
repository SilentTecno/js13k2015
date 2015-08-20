var Particle = ( function(){
	var _particle = this;

	function Particle() {
		_particle = this;

		this.init = function (p) {
			_particle.mass = p.mass || 0.1;
			_particle.cr = p.bounciness || -0.5 // Coefficient of restitution
			_particle.aceleration = p.aceleration;
			_particle.radius = p.height;
			_particle.color = p.color;
			_particle.size = p.size;
			_particle.position = new Vector(p.position);
			_particle.velocity = new Vector({x:0, y: 0});
			_particle.lastVelocity = new Vector({x:0, y: 0});
			_particle.grounded = {x: false, y: false};
			_particle.acceleration = new Vector({x:0, y: 0});
			_particle.forces = new Vector({x:0, y: 0});
			_particle._type = p._type;
			_particle.cruiseVelocity = p.cruiseVelocity || 1.5;
			_particle.rotation = p.rotation || 0;
		};

		this.draw = function(ctx) {

			ctx.beginPath();

			switch(this._type) {
				case 'ship':
					//ctx.translate(this.position.x, this.position.y);
					ctx.lineWidth = 2;
					ctx.moveTo(this.position.x, this.position.y);
					ctx.lineTo(this.position.x + this.size.width, this.position.y + (this.size.height/2));
					ctx.moveTo(this.position.x + this.size.width, this.position.y + (this.size.height/2));
					ctx.lineTo(this.position.x, this.position.y + this.size.height);
					ctx.moveTo(this.position.x, this.position.y + this.size.height);
					ctx.lineTo(this.position.x + (this.size.width/3), this.position.y + (this.size.height/2));
					ctx.moveTo(this.position.x + (this.size.width/3), this.position.y + (this.size.height/2));
					ctx.lineTo(this.position.x, this.position.y);
					ctx.strokeStyle = this.color || 'orange';
					ctx.stroke();
					ctx.rotate(this.rotation * Math.PI / 180);
				break;
				case 'asteriod':
					ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
					ctx.fillStyle = this.color || 'blue';
					ctx.fill();
				break;
				case 'reversed':
					ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
					ctx.fillStyle = this.color || 'red';
					ctx.fill();
				break;
			}

			ctx.closePath();

			if (window.debug_mode) {
				//console.debug('I´m', this);
				//this.position.debug();
			}
		};

		this.animate = function() {
			_particle.draw();
		};
	}

	return Particle;
})();