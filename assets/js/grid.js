function gridElement(id,xcoord,ycoord,img){
	this.id = id;
	this.xcoord = xcoord;
	this.ycoord = ycoord;
	this.img = img;
	
	this.draw = function(context){
		scaled = {
			x: this.x*context.canvas.width
			y: this.y*context.canvas.height
			w: this.w*context.canvas.width
			h: this.h*context.canvas.height
		}
		context.drawImage(this.img,scalex.x,scaled.y,scaled.w,scaled.h);
	}
	
}

function grid(Xwidth, Ywidth){
	this.x = Xwidth;
	this.y = Ywidth;
	
	this.elements = [];
	
	this.addEl = function(object,xcoord,ycoord){
		el = new gridElement(xcoord+ycoord,xcoord,ycoord);
		elements.push(el);
	}
	
	this.rmvEl = function(object){}
	
	this.drawGrid = function(){
		for(i=0;i<elements.length;i++){
			element.draw();
		}
	}
	}
