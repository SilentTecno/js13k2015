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
			_particle.forces = p.forces || new Vector({x:0, y: 0});
			_particle._type = p._type;
			_particle.cruiseVelocity = p.cruiseVelocity || 1.5;
			_particle.rotation = p.rotation || 0;
			_particle.id= p.id;
			_particle.name= p.name;
		};

		this.draw = function(ctx) {

			ctx.beginPath();
			ctx.save();

			switch(this._type) {
				case 'ship':
					var orig = {x: - (this.size.width/2), y: - (this.size.height/2)}
					ctx.lineWidth = 2;
					ctx.translate(this.position.x + (this.size.width/2), this.position.y + (this.size.height/2));
					//ctx.translate(this.position.x, this.position.y);
					ctx.rotate(this.rotation * Math.PI/180);
					ctx.moveTo(orig.x, orig.y);
					ctx.lineTo(orig.x + this.size.width, orig.y + (this.size.height/2));
					ctx.moveTo(orig.x + this.size.width, orig.y + (this.size.height/2));
					ctx.lineTo(orig.x, orig.y + this.size.height);
					ctx.moveTo(orig.x, orig.y + this.size.height);
					ctx.lineTo(orig.x + (this.size.width/3), orig.y + (this.size.height/2));
					ctx.moveTo(orig.x + (this.size.width/3), orig.y + (this.size.height/2));
					ctx.lineTo(orig.x, orig.y);
					ctx.fillStyle = "#FF0000";
					// ctx.fillRect(orig.x, orig.y,this.size.width,this.size.height);
					ctx.strokeStyle = this.color || 'orange';
					ctx.stroke();
				break;
				case 'laser':
					var orig = {x: - (this.size.width/2)}
					ctx.lineWidth = 3;
					// ctx.translate(this.position.x + (this.size.width/2), this.position.y + (this.size.height/2));
					ctx.translate(this.position.x, this.position.y);
					ctx.rotate(this.rotation * Math.PI/180);
					ctx.moveTo(0, 0);
					ctx.lineTo(this.size.width, 0);
					ctx.strokeStyle = this.color || 'orange';
					ctx.stroke();
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
			ctx.restore();
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