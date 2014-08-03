
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
	this.enter = function () {console.log("Button enter!")}
	this.exit = function () {console.log("Button exit!")}
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
			this.hover = false;
		}
	}

	this.mouseMove = function(event) {
		if (this.mouseIsOver(event)) {
			if (!this.hover) {
				id("button_hover").play();
				this.screen.canvas.canvas_element.style.cursor = "pointer";
				this.enter();
			}
			this.hover = true;
		} else {
			if (this.hover) {
				this.screen.canvas.canvas_element.style.cursor = "default";
				this.exit();
			}
			this.hover = false;
		}
	}

	return this;
}

function InvisibleButton(x, y, w, h) {
	this.__proto__ = new Button(x, y, w, h);

	this.draw = function(context) {
		scaled = {
			x: this.x * context.canvas.width,
			y: this.y * context.canvas.height,
			w: this.w * context.canvas.width,
			h: this.h * context.canvas.height
		}
		context.strokeStyle = this.hover?"#f00":"#000";
		context.strokeRect(scaled.x, scaled.y, scaled.w, scaled.h);
	}
}

function MenuScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/test.jpg");

	startButton = new Button(0.25, 0.25, 0.5, 0.1);
	startButton = this.addButton(startButton);
	startButton.text = "Start Game";
	aboutButton = new Button(0.25, 0.35, 0.5, 0.1);
	aboutButton = this.addButton(aboutButton);
	aboutButton.text = "About";


	startButton.action = function () {
		this.screen.canvas.setScreen(1);
	}

	aboutButton.action = function () {
		this.screen.canvas.setScreen(7);
	}

	return this;
}

function AboutScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/backgrounds/About.jpg");

	backButton = new Button(0.6,0.9,0.4,0.1);
	backButton.text = "back";

	backButton.action = function() {
		this.screen.canvas.setScreen(0);
	}

	this.addButton(backButton);


	return this;
}

function MapScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/map.png");

	level1Button = new InvisibleButton(0.01, 0.65, 0.4, 0.3);
	level1Button = this.addButton(level1Button);
	level2Button = new InvisibleButton(0.415, 0.48, 0.15, 0.15);
	level2Button = this.addButton(level2Button);
	level3Button = new InvisibleButton(0.575, 0.53, 0.32, 0.3);
	level3Button = this.addButton(level3Button);
	level4Button = new InvisibleButton(0.3, 0.2, 0.38, 0.265);
	level4Button = this.addButton(level4Button);
	level5Button = new InvisibleButton(0.14, 0.0, 0.15, 0.15);
	level5Button = this.addButton(level5Button);

	level1Button.action = function () {
		window.location = "tower-defence/index.html"
	}

	level2Button.action = function () {this.screen.canvas.setScreen(3); }
	level3Button.action = function () {this.screen.canvas.setScreen(4); }
	level4Button.action = function () {this.screen.canvas.setScreen(5); }
	level5Button.action = function () {this.screen.canvas.setScreen(6); }

	backButton = new Button(0.6,0.9,0.4,0.1);
	backButton.text = "back";

	backButton.action = function() {
		this.screen.canvas.setScreen(0);
	}

	this.addButton(backButton);
}

function LevelScreen() {
	this.__proto__ = new Screen();
	this.background = new Background("img/test/test.jpg");

	this.setLevel = function (level_number) {
		this.level = new Level(1, this);
	}

	this.tick = function () {
		this.level.tick();
	}

	this.draw = function (context) {
		this.background.draw(context);
		this.level.draw(context);
		for (i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].draw(context);
		}
	}

	dipoleButton = new TowerButton(0.8, 0, "dipole");

	this.addButton(dipoleButton);

	this.setLevel(1);

}

function InfoLevelScreen(level_number, info) {
	console.log("Level number ", level_number);
	this.__proto__ = new Screen();
	this.background = new Background("img/level/"+level_number+".jpg");
	this.info = info;



	function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
		var line = '';

		for(var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		context.fillText(line, x, y);
	}

	this.draw = function(context) {
		this.background.draw(context);

		context.fillStyle = "rgba(0,0,0,0.5)";
		context.fillRect(0,0,context.canvas.width,context.canvas.height);
;
		context.fillStyle = "#FFF";
		context.font = "20px Arial";
		wrapText(context, this.info, 10, 30, context.canvas.width, 20);		

		for (i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].draw(context);
		}
	}

	backButton = new Button(0.6,0.9,0.4,0.1);
	backButton.text = "back";

	backButton.action = function() {
		this.screen.canvas.setScreen(1);
	}

	this.addButton(backButton);

	return this;
}

function load() {
	console.log("load");
	canvas_element = document.getElementById("canvas");
	canvas_context = canvas_element.getContext("2d");

	canvas = new Canvas(canvas_element);

	fps = 30;

	canvas.addScreen(new MenuScreen());
	canvas.addScreen(new MapScreen());
	canvas.addScreen(new LevelScreen());
	canvas.addScreen(new InfoLevelScreen(2,"The Proton Synchrotron Booster is made up of four superimposed synchrotron rings that receive beams of protons from the linear accelerator Linac 2 at 50 MeV and accelerate them to 1.4 GeV for injection into the Proton Synchrotron (PS).Before the Booster received its first beams on 26 May 1972, protons were injected directly from the linac into the PS, where they were accelerated to 26 GeV. The low injection energy of 50 MeV limited the number of protons the PS could accept. The Booster allows the PS to accept over 100 times more protons, which greatly enhances the beam's use for experiments."));
	canvas.addScreen(new InfoLevelScreen(3,"The Proton Synchrotron (PS) is a key component in CERN’s accelerator complex, where it usually accelerates either protons delivered by the Proton Synchrotron Booster or heavy ions from the Low Energy Ion Ring (LEIR). In the course of its history it has juggled many different kinds of particles, feeding them directly to experiments or to more powerful accelerators. The PS first accelerated protons on 24 November 1959, becoming for a brief period the world’s highest energy particle accelerator. The PS was CERN’s first synchrotron. It was initially CERN's flagship accelerator, but when the laboratory built new accelerators in the 1970s, the PS’s principal role became to supply particles to the new machines. Over the years, it has undergone many modifications and the intensity of its proton beam has increased a thousandfold. With a circumference of 628 metres, the PS has 277 conventional (room-temperature) electromagnets, including 100 dipoles to bend the beams round the ring. The accelerator operates at up to 25 GeV. In addition to protons, it has accelerated alpha particles (helium nuclei), oxygen and sulphur nuclei, electrons, positrons and antiprotons."));
	canvas.addScreen(new InfoLevelScreen(4,"The Super Proton Synchrotron (link is external) (SPS) is the second-largest machine in CERN’s accelerator complex. Measuring nearly 7 kilometres in circumference, it takes particles from the Proton Synchrotron and accelerates them to provide beams for the Large Hadron Collider, the NA61/SHINE and NA62 experiments, the COMPASS experiment and the CNGS project. The SPS became the workhorse of CERN’s particle physics programme when it switched on in 1976. Research using SPS beams has probed the inner structure of protons, investigated nature’s preference for matter over antimatter, looked for matter as it might have been in the first instants of the universe and searched for exotic forms of matter. A major highlight came in 1983 with the Nobel-prize-winning discovery of W and Z particles, with the SPS running as a proton-antiproton collider. The SPS operates at up to 450 GeV. It has 1317 conventional (room-temperature) electromagnets, including 744 dipoles to bend the beams round the ring. The accelerator has handled many different kinds of particles: sulphur and oxygen nuclei, electrons, positrons, protons and antiprotons."));
	canvas.addScreen(new InfoLevelScreen(5,"The Large Hadron Collider (LHC) is the world’s largest and most powerful particle accelerator. It first started up on 10 September 2008, and remains the latest addition to CERN’s accelerator complex. The LHC consists of a 27-kilometre ring of superconducting magnets with a number of accelerating structures to boost the energy of the particles along the way. Inside the accelerator, two high-energy particle beams travel at close to the speed of light before they are made to collide. The beams travel in opposite directions in separate beam pipes – two tubes kept at ultrahigh vacuum. They are guided around the accelerator ring by a strong magnetic field maintained by superconducting electromagnets. The electromagnets are built from coils of special electric cable that operates in a superconducting state, efficiently conducting electricity without resistance or loss of energy. This requires chilling the magnets to ‑271.3°C – a temperature colder than outer space. For this reason, much of the accelerator is connected to a distribution system of liquid helium, which cools the magnets, as well as to other supply services."));
	canvas.addScreen(new AboutScreen());
	canvas.setScreen(0);

	setInterval(function(){canvas.tick()}, 1000/fps);
}

window.addEventListener("load", load);