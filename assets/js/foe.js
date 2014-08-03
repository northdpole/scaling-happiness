
this.foe = function(hp,type,speed,focus,bending){
	this.hp = hp;
	this.type = type;
	this.speed = speed;
	this.focus = focus
	this.bending = bending
	this.time = 0;

	this.position = {x:0,y:0};

	/* Function to be overriden by bunch */
	this.modify_focus = function(){}

	this.setPath = function(path){
		this.path = path;
	}

	this.tick = function() {
		this.position = this.path.getPoint(this.time);
		console.log(this.position);
		this.time = this.time + 1;
	}
	
	/* Accelerates/decelerates a particle
	 * if called with type="%" it assumes acceleration is a percentage
	 */
	this.accelerate = function(acceleration,type){
		if(type.match("%"))
			this.speed+= this.speed*acceleration/100;
		else
			this.speed += this.acceleration;
	}
	
	this.bend = function(curve,type){
		if(type.match("%"))
			this.bending+= this.curve*acceleration/100;
		else
			this.bending += this.curve;
	}
	// this.rmvhp = function(dmg){
	// 	// console.log("foe "+id+"received dmg " + dmg);
	// 	if(dmg>hp)
	// 		return 0;
	// 	else{
	// 		this.hp-=dmg
	// 		return this.hp;
	// 	}
	// }
}
this.particle = function(){
	this.__proto__ = new foe
	this.img = new Image();
	this.img.src = "img/test/ingame/particle.png";

	this.draw = function(context) {
		scaled = {
			x: this.position.x * context.canvas.width,
			y: this.position.y * context.canvas.height
		}
		context.drawImage(this.img, scaled.x, scaled.y, 10, 10);
	}

}

this.bunch = function(particles){
	this.__proto__ = new foe
	this.focus = 5;
	this.modify_focus = modify_focus;
	this.particles = particles;

	// this.modify = function_focus(focus_modifier,type){
	// 	if(type.match("%"))
	// 		this.focus+= this.focus_modifier*acceleration/100;
	// 	else
	// 		this.focus += this.focus_modifier;
	// }
}
