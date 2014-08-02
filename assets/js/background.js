function background(image,sizeX,sizeY){
	this.image = image
	this.sizeX = sizeX
	this.sizeY = sizeY
	this.get_background = get_background;
	this.grid = ''

	function get_background(){return this.image}
	
	/* I guess we need more graphic specific functions here to overlay a grid to the background e.t.c.*/
	}
