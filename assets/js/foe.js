function path() {

	this.p1 = {x:0,y:5};
	this.p2 = {x:5,y:5};
	this.p3 = {x:5,y:0};
	this.p4 = {x:5,y:0};

	function getPoint(t) {
		return 0.5 * ( ( 2.0 * this.p1) + (this.p2 - this.p0) * t + (2.0 * this.p0 - 5.0*this.p1 + 4.0*this.p2 -this.p3)*Math.pow(t,2)+(-this.p0+3.0*this.p1-3.0*this.p2+this.p3)*Math.pow(t,3));
	}
}

function foe(id,hp,type,speed,focus,bending){
	 this.hp = hp;
	 this.type = type;
	 this.speed = speed;
	 this.id = id;
	 this.focus = focus
	 this.bending = bending
	 this.rmvhp = rmvhp;
	 this.march = march;
	 this.modify_focus = modify_focus;
	 this.bend = bend;
	 this.accelerate = accelerate;
	 this.time = 0;
	/* Function to be overriden by bunch */
	function modify_focus(){}

	/* Accepts a path object and makes the 
	 * creep follow the path
	 */
	function march(path){
		this.path = path;
	}

	function tick() {
		this.position = this.path.getPoint(this.time);
		this.time = this.time + 1;
	}
	
	/* Accelerates/decelerates a particle
	 * if called with type="%" it assumes acceleration is a percentage
	 */
	function accelerate(acceleration,type){
		if(type.match("%"))
			this.speed+= this.speed*acceleration/100;
		else
			this.speed += this.acceleration;
	}
	
	function bend(curve,type){
		if(type.match("%"))
			this.bending+= this.curve*acceleration/100;
		else
			this.bending += this.curve;
	}
	function rmvhp(dmg){
		console.log("foe "+id+"received dmg " + dmg);
		if(dmg>hp)
			return 0;
		else{
			this.hp-=dmg
			return this.hp;
		}
	}
}
function particle(img){
	this.__proto__ = new foe
	this.img = img;


}

function bunch(particles){
	this.__proto__ = new foe
	this.focus = 5;
	this.modify_focus = modify_focus;
	this.particles = particles;

	function modify_focus(focus_modifier,type){
		if(type.match("%"))
			this.focus+= this.focus_modifier*acceleration/100;
		else
			this.focus += this.focus_modifier;
	}
}
