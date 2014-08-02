function placeable(damage){
	this.damage = damage;

	this.hit = hit;
	
	function hit(foe){
		return foe.rmvhp(this.dmg);
		}
}

function trap(){
	this.type = trap;
}
	
function tower(){
	this.type = 'tower';
}
tower.prototype = Object.create(placeable.prototype);

function accelerator_cavity(){
	this.type = 'cavity';
	this.__proto__ = new placeable
	this.hit = hit;
	function hit(ammount,foe){foe.accelerate(ammount,'');}
}
function quadrupole(){
	this.__proto__ = new placeable
	this.type = 'quadrupole';
	this.hit = hit;
	
	function hit(ammount,foe){foe.modify_focus(ammount,'');}
	
}

function dipole(){
	this.type = 'dipole';
	this.__proto__ = new placeable
	this.hit = hit;
	function hit(ammount,foe){ foe.bend(ammount,'');}
}
