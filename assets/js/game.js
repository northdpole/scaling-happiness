

function Canvas(context) {
	this.screens = [];
	this.context = context;

	this.addScreen = function(s) {
		this.screens.push(s);
	}

	this.setScreen = function(screen_index) {
		this.current_screen = this.screens[screen_index];
	}

	this.draw = function(context) {
		this.current_screen.draw(context);
	}

	this.tick = function() {
		this.current_screen.tick();
		this.draw(this.context);
	}

	return this;
}

function Screen() {
	this.buttons = [];
	this.background = null;
	this.level = null; // There is no level to begin with

	this.addButton = function(button) {
		this.buttons.push(button);
	}

	this.draw = function draw(context) {
		this.background.draw(context);
	}

	this.tick = function tick() {

	}

	return this;
}

function Background(file_name) {
	this.file_name = file_name;
	this.img = new Image();
	this.img.src = file_name;

	this.draw = function(context) {
		context.drawImage(this.img,0,0);
	}

	return this;
}

function Button(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = function(context) {
		context.fillRect(this.x, this.y, this.w * context.canvas.width, this.h * context.canvas.height);
	}

	return this;
}

function MenuScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("http://vividlife.me/ultimate/wp-content/uploads/2013/02/Rubber_Duck_Sea_by_whispering_hills-1.jpg");

	console.log(this);
	return this;
}

function load() {
	canvas_context = document.getElementById("canvas").getContext("2d");

	canvas = new Canvas(canvas_context);

	fps = 30;

	canvas.addScreen(new MenuScreen());
	canvas.setScreen(0);

	setInterval(function(){canvas.tick()}, 1000/fps);
}

window.addEventListener("load", load);