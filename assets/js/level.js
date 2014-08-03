function Path() {
	this.points = [];

	this.addPoint = function(x, y) {
		this.points.push({x: x, y: y});
	}

	this.getPoint = function(t) {
		return {x: t / 1000, y: 0.5};
		//return 0.5 * ( ( 2.0 * this.p1) + (this.p2 - this.p0) * t + (2.0 * this.p0 - 5.0*this.p1 + 4.0*this.p2 -this.p3)*Math.pow(t,2)+(-this.p0+3.0*this.p1-3.0*this.p2+this.p3)*Math.pow(t,3));
	}

	return this;
}

function Level(level_number, screen) {
	this.screen = screen;
	// this.screen.background = new Background("img/level/"+level_number+".jpg");
	id("body").style.backgroundImage = "img/level/"+level_number+".jpg";
	this.path = new Path();
	this.path.addPoint({x: 0,y: 0.5});
	this.path.addPoint({x: 1.0,y: 0.5});
	this.foes = [];

	this.addParticle = function() {
		particle = new particle();
		particle.path = this.path;
		this.foes.push(particle);
	}

	this.tickFoes = function() {
		for (i = 0; i < this.foes.length; ++i) {
			this.foes[i].tick();
		}
	}

	this.tick = function() {
		this.tickFoes();
	}

	this.draw = function(context) {		
		for (i = 0; i < this.foes.length; ++i) {
			this.foes[i].draw(context);
		}
	}

	this.addParticle();

	return this;
}