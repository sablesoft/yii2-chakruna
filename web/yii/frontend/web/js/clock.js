// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL CLASS "CLOCK":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// start();
// stop();
// reload();
// formPause();
// formShow();
// present();
// show();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// про создании объекта класса Clock никакие методы не запускаются
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Clock (options) { // options = {interval, ...}

	// OUTHER PROPERTIES:
	this.paused = false;
	this.run = false;
	this.voyage = false;
	this.animate = {};
	this.interval = 5000;
	this.upload = 0;
	this.trans = 5;
	if (options) {
		if (options.interval) {
			this.interval = options.interval;
		}
	}

	// OUTER METHODS:
	this.updateCheck = function() {
		if (++this.upload == this.trans) {
			storage.save('shamUpdate', moment().unix());
			boardInit();
		}
	};

	this.start = function () {
		if (this.run) {
			return null;
		}
		if (this.paused) {
			this.run = setInterval(function() {
				// console.log('form show OFF!');
				var newstaff = staff.new();
			}, this.interval);			
		} else {
			this.run = setInterval(function() {
				// console.log('form show ON!');
				var newstaff = staff.new();
				form.set(newstaff);
			}, this.interval);
		}
		$('.btn-now').addClass('power-focus');
		$('.btn-show').removeClass('power-focus');
		// console.log('clock started!');
	};

	this.stop = function () {
		if (!this.run) {
			// console.log('clock is not running!');
			return null;
		}
		clearInterval(this.run);
		this.run = null;
		$('.btn-now').removeClass('power-focus');
		$('.btn-show').addClass('power-focus');
		// console.log ('clock stoped!');
	};

	this.reload = function () {
		if (!this.run) {
			// console.log('ABORT RELOAD: clock not running!');
			return null;
		}
		this.stop();
		this.start();
	};

	this.formPause = function () {
		this.paused = true;
		// console.log('form show paused!');
		this.reload();
	};

	this.formShow = function () {
		this.paused = false;
		// console.log('form show active!');
		this.reload();
	};

	this.present = function () { // show present time - auto clock ON
		this.paused = false;
		var stick = form.get();
		var newStick = new Stick();
		newStick.gps = stick.gps;
		this.stop();
		staff.new(newStick);
		form.set();
		this.start();
	};

	this.show = function (newstaff) { // show not present time - autoclock OFF
		this.paused = false; // - убираем паузу, если была
		this.stop(); // - останавливаем часы, если шли
		if (newstaff) { newstaff = staff.new(newstaff);	} // вход по клику по спице или по кнопке домов
		else { newstaff = staff.new(form.get()); }; // вход по форме
		form.set(newstaff); // меняем данные формы
	};
	this.animated = function() {
		for (wheel in Wheels) {
			if (this.animate[wheel] == true) return true;
		}
		return false;
	};

	// устанавливаем флаг активного показа тура:
	this.voyageStart = function() {	clock.voyage = true; }

	// снимаем флаг показа тура:
	this.voyageEnd = function() { clock.voyage = false; allTours.end(); }
}