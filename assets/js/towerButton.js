function TowerButton(x, y, type) {
	this.__proto__ = new Button(x, y, 0.2, 0.2);

	this.img = new Image();
	this.img.src = "img/towerButton/" + type + ".png";

	this.draw = function(context) {
		scaled = {
			x: this.x * context.canvas.width,
			y: this.y * context.canvas.height,
			w: this.w * context.canvas.width,
			h: this.h * context.canvas.height
		}
		context.drawImage(this.img, scaled.x, scaled.y, scaled.w, scaled.h);
	}
}