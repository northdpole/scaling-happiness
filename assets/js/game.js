
function id(id) {
	return document.getElementById(id);
}


function Canvas(canvas_element) {
	this.screens = [];
	this.canvas_element = canvas_element;
	this.context = canvas_element.getContext("2d");

	this.addScreen = function(s) {
		s.canvas = this;
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

	this.scaleMouseEvent = function(event) {
		return {
			x: event.offsetX / this.context.canvas.width, 
			y: event.offsetY / this.context.canvas.height
		};
	}

	this.mouseClick = function(event) {
		event = this.scaleMouseEvent(event);
		this.current_screen.mouseClick(event);
	}

	this.mouseMove = function(event) {
		event = this.scaleMouseEvent(event);
		this.current_screen.mouseMove(event);
	}

	p = this;
	canvas_element.addEventListener("click", function(event) {p.mouseClick(event);});
	canvas_element.addEventListener("mousemove", function(event) {p.mouseMove(event);});

	return this;
}

function Screen() {
	this.buttons = [];
	this.background = null;
	this.canvas = null;

	this.addButton = function(button) {
		button.screen = this;
		this.buttons.push(button);
		return button;
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

	this.mouseMove = function(event) {
		for (i = 0;i < this.buttons.length; ++i) {
			this.buttons[i].mouseMove(event);
		}
	}

	return this;
}

function Background(file_name) {
	this.file_name = file_name;
	this.img = new Image();
	this.img.src = file_name;

	this.draw = function(context) {
		context.drawImage(this.img, 0, 0, context.canvas.width, context.canvas.height);
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
	this.hover = false;

	this.draw = function(context) {
		scaled = {
			x: this.x * context.canvas.width,
			y: this.y * context.canvas.height,
			w: this.w * context.canvas.width,
			h: this.h * context.canvas.height
		}
		context.fillStyle = this.hover?"#000":"#FFF";
		context.fillRect(scaled.x, scaled.y, scaled.w, scaled.h);
		context.fillStyle = "#000";
		context.fillRect(scaled.x, scaled.y + scaled.h - 2, scaled.w, 2);

		context.font = (scaled.h - 20) + "px buttonFont";
		context.fillStyle = !this.hover?"#000":"#FFF";
		context.fillText(
			this.text,
			this.x * context.canvas.width + 5, 
			(this.y + this.h) * context.canvas.height - 12 + (this.hover?2:0));
	}

	this.mouseIsOver = function(event) {
		return event.x > this.x && event.y > this.y && event.x < this.x + this.w && event.y < this.y + this.h;
	}

	this.mouseClick = function(event) {
		if (this.mouseIsOver(event)) {
			id("button_pressed").play();
			this.action();
			this.screen.canvas.canvas_element.style.cursor = "default";
		}
	}

	this.mouseMove = function(event) {
		if (this.mouseIsOver(event)) {
			if (!this.hover) {
				id("button_hover").play();
				this.screen.canvas.canvas_element.style.cursor = "pointer";
			}
			this.hover = true;
		} else {
			this.hover = false;
			this.screen.canvas.canvas_element.style.cursor = "default";
		}
	}

	return this;
}

function InvisibleButton(x, y, w, h) {
	this.__proto__ = Button(x, y, w, h);

	this.draw = function(context) {
		scaled = {
			x: this.x * context.canvas.width,
			y: this.y * context.canvas.height,
			w: this.w * context.canvas.width,
			h: this.h * context.canvas.height
		}
		context.strokeStyle = "#000";
		context.strokeRect(scaled.x, scaled.y, scaled.w, scaled.h);
	}
}

function MenuScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/test.jpg");

	startButton = new Button(0.25, 0.25, 0.5, 0.1);
	startButton = this.addButton(startButton);
	startButton.text = "Start Game";

	startButton.action = function () {
		this.screen.canvas.setScreen(1);
	}

	return this;
}

function MapScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/map.png");

	level1Button = new InvisibleButton(0.01, 0.65, 0.4, 0.3);
	level1Button = this.addButton(level1Button);

	level1Button.action = function () {
		this.screen.canvas.setScreen(0);// Set screen to the level screen
	}
}

function LevelScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/test.jpg");
	this.level = new Level(1);

}

function Level(level_number) {

}

function load() {
	canvas_element = document.getElementById("canvas");
	canvas_context = canvas_element.getContext("2d");

	canvas = new Canvas(canvas_element);

	fps = 30;

	canvas.addScreen(new MenuScreen());
	canvas.addScreen(new MapScreen());
	canvas.addScreen(new LevelScreen());
	canvas.setScreen(0);

	setInterval(function(){canvas.tick()}, 1000/fps);
}

window.addEventListener("load", load);