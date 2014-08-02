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
	 this.explode =  explode;

	/* Function to be overriden by bunch */
	function modify_focus(){}

	/* Accepts a path object and makes the 
	 * creep follow the path
	 */
	function march(path){
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
	/* makes a "big" particle
	 * explode into smaller ones
	 * useful for collisions
	 * returns an array of the new particles
	 */
	function explode(){
		var parts = [];
		for(i=0; i<10; i++)
			parts.push(new particle(i+20,this.hp/10,this.type,this.speed,this.focus/2,this.bending));
		return parts;
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
