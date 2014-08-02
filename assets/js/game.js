

function Canvas(context) {
	this.screens = [];
	this.context = context;

	this.addScreen = function(s) {
		this.screens.push(s);
	}

	this.setScreen = function(screen_index) {
		this.current_screen = this.screens[screen_index];
	}

	this.draw = function() {

	}

	this.tick = function() {
		console.log("tick");
	}

	return this;
}

function Screen() {
	this.buttons = [];

	this.addButton = function(button) {
		this.buttons.push(button);
	}

	return this;
}

function Button() {

	console.log(this);
}

canvas_context = document.getElementById("canvas");

canvas = new Canvas(canvas_context);

fps = 30;

// setInterval(function(){canvas.tick()}, 1000/fps);