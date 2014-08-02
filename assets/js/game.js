

function Canvas(canvas_element) {
	this.screens = [];
	this.context = canvas_element.getContext("2d");

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

	this.mouseClick = function(event) {
		event = {
			x: event.offsetX / this.context.canvas.width, 
			y: event.offsetY / this.context.canvas.height};

		this.current_screen.mouseClick(event);
	}
	p = this;
	canvas_element.addEventListener("click", function(event) {p.mouseClick(event);});

	return this;
}

function Screen() {
	this.buttons = [];
	this.background = null;
	this.level = null; // There is no level to begin with

	this.addButton = function(button) {
		this.buttons.push(button);
	}

	this.draw = function(context) {
		this.background.draw(context);
		for (i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].draw(context);
		}
	}

	this.tick = function() {

	}

	this.mouseClick = function(event) {
		for (i = 0;i < this.buttons.length; ++i) {
			this.buttons[i].mouseClick(event);
		}
	}

	return this;
}

function Background(file_name) {
	this.file_name = file_name;
	this.img = new Image();
	this.img.src = file_name;

	this.draw = function(context) {
		context.drawImage(this.img, 0, 0);
	}

	return this;
}

function Button(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.action = function () {console.log("Button action!")}
	this.text = "Button";

	this.draw = function(context) {
		scaled = {
			x: this.x * context.canvas.width,
			y: this.y * context.canvas.height,
			w: this.w * context.canvas.width,
			h: this.h * context.canvas.height
		}
		context.fillStyle = "#FFF";
		context.strokeStyle = "#000";
		context.fillRect(scaled.x, scaled.y, scaled.w, scaled.h);
		context.strokeRect(scaled.x, scaled.y, scaled.w, scaled.h);

		context.font = (scaled.h - 10) + "px Comic Sans MS";
		context.fillStyle = "#000";
		context.fillText(
			this.text,
			this.x * context.canvas.width, 
			(this.y + this.h) * context.canvas.height - 8);
	}

	this.mouseClick = function(event) {
		if (event.x > this.x && event.y > this.y &&
			event.x < this.x + this.w &&
			event.y < this.y + this.h) {
			this.action();
		}
	}

	return this;
}

function MenuScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("/img/test/test.jpg");

	testButton = new Button(0.25, 0.25, 0.5, 0.1);
	testButton.action = function () {
		testButton.text = "You clicked me!";
	}

	this.addButton(testButton);

	return this;
}

function load() {
	canvas_element = document.getElementById("canvas");
	canvas_context = canvas_element.getContext("2d");

	canvas = new Canvas(canvas_element);

	fps = 30;

	canvas.addScreen(new MenuScreen());
	canvas.setScreen(0);

	setInterval(function(){canvas.tick()}, 1000/fps);
}

window.addEventListener("load", load);