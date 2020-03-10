// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL CLASS "STAFF":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// getArea();
// reload(options);
// clock(options);
// show(options); - move(options);
// checkPresent();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// когда создаётся объект класса "Staff" запускается его метод "new"
// в котором создаётся новый стафф и отображается на доске
// а затем его момент устанавливается в форму
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var StickProp = { // этот объект убоден для быстрого перебора свойств стаффа
	'angles' : {}, 'gps' : {}, 'lairs' : {}, 'lairsFlag' : {}, 'pike' : moment(), 'wheels' : {}
}

// вспомогательный класс с полями данных:
function Stick (props) {
	this.angles = {},
	this.gps = {},
	this.lairs = {},
	this.lairsFlag = {},
	this.pike = moment(),
	this.cashingPike = null,
	this.wheels = {};
	if (props) {
		for (prop in StickProp) {
			if (props[prop]) { this[prop] = props[prop]; }
		}
	}
}

function Staff (options) { // options = { pike, gps, staffId }

	// INNER FUNCTIONS:
	// ...
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// INNER CONSTANT:
	var staffId = 'staff',
		img = './img/star/starGreen.png';
	var minDur = 60000;
	this.focusDur = { 'sun' : minDur * 720, 'moon' : minDur * 30, 'earth' : minDur * 3 };

	if (options) {
		if (options.staffId) {
			staffId = options.staffId;
		};
		if (options.img) {
			img = options.img;
		};
		if (options.minDur) {
			minDur = options.minDur;
		};
		if (options.focusDur) {
			this.focusDur = options.focusDur;
		};
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	this.getLairsFlag = function () {
		var pike = this.pike;
		var spoke, dur, lair;
		this.lairsFlag = {};
		for (wheel in Wheels) {
			lair = this.lairs[wheel];
			spoke = this.wheels[wheel][lair]
			dur = parseInt(Math.abs(pike.diff(spoke)));
			if ( dur < this.focusDur[wheel] ) {
				this.lairsFlag[wheel] = 1;
			} else {
				this.lairsFlag[wheel] = 0;
			};
		};
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// связь с астрономической библиотекой и получение всех данных:
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	this.getArea = function() {
		this.wheels = gate.getWheels(this); // {sun, moon, earth} - arrays of gate moments (possibly)
		this.lairs = gate.getLairs(this); // {...} - object of spokes numbers
		this.angles = gate.getAngles(this); // {...} - object of wheels angles
		this.getLairsFlag();
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.getLair = function(wheel) {
		if (!wheel) return null;
		var lair = this.lairs[wheel];
		return this.wheels[wheel][lair];
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// методы для работы с кешированым пиком:
	this.cashPike = function(pike) {
		this.cashingPike = (pike)? pike : this.pike;
	}
	this.clearCash = function() {
		this.cashingPike = null;
	}
	this.checkPike = function() {
		var valid = ((this.cashingPike.diff(this.pike)) === 0);
		return valid;
	}

	this.nearNewMoon = function(customPike) {
		// выбираем точку отсчёта по приоритету: 
		// 1) полученный пик, 2) кэш, 3) текущий момент
		var pike = (this.cashingPike)? this.cashingPike : this.pike;
		pike = (customPike)? customPike : pike;
		// находим Новолуние в текущем цикле:
		var currNewMoon = this['wheels']['moon'][12];
		var currDiff = pike.diff(currNewMoon);
		// получаем произвольный момент прошлого лунного цикла:
		var newPike = this['wheels']['moon'][0];
		newPike.subtract(10, 'hours');
		// готовим стик для получения новых циклов:
		var throwStick = new Stick(staff);
		throwStick.pike = moment(newPike);
		// находим новые циклы и прошлое Новолуние:
		var wheels = gate.getWheels(throwStick);
		var prevNewMoon = wheels['moon'][12];
		var prevDiff = pike.diff(prevNewMoon);
		// сравниваем текущее и прошлое Новолуние:
		var currentMoon = (Math.abs(currDiff) < Math.abs(prevDiff));
		// console.log('current moon: ' + currentMoon);
		if (currentMoon) { return currNewMoon; } else return prevNewMoon;
	}

	this.nearMidnight = function(customPike) {
		// выбираем точку отсчёта по приоритету: 
		// 1) полученный пик, 2) кэш, 3) текущий момент
		var pike = (this.cashingPike)? this.cashingPike : this.pike;
		pike = (customPike)? customPike : pike;
		// находим Полночь в текущих сутках:
		var currMidnight = this['wheels']['earth'][12];
		var currDiff = pike.diff(currMidnight);
		// получаем произвольный момент прошлых суток:
		var newPike = this['wheels']['earth'][0];
		newPike.subtract(10, 'hours');
		// готовим стик для получения новых циклов:
		var throwStick = new Stick(staff);
		throwStick.pike = moment(newPike);
		// находим новые циклы и прошлую Полночь:
		var wheels = gate.getWheels(throwStick);
		var prevMidnight = wheels['earth'][12];
		var prevDiff = pike.diff(prevMidnight);
		// сравниваем текущую и прошлую Полночь:
		var current = (Math.abs(currDiff) < Math.abs(prevDiff));
		if (current) { return currMidnight; } else return prevMidnight;			
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	this.new = function (stick) {

		this.pike = moment();
		this.Id = staffId;
		this.img = img;

		if (stick) {
			for (prop in StickProp) {
				if (stick[prop]) { this[prop] = stick[prop]; }
			}
			if (stick.gps) { storage.current('gps', storage.number('gps', stick.gps)); };
		};
		
		this.gps = storage.get('gps');
		this.getArea();

		// проверяем на глюк с застреванием на новом драконе:
		for (var wheel in Wheels) {
			var lair = this['lairs'][wheel];
			if (lair === 16) {
				var lairPike = this['wheels'][wheel][lair];
				var zero = (this.pike.diff(lairPike) === 0);
				if (zero) {
					lairPike.add(10, 'hours');
					var throwStick = new Stick(staff);
					throwStick.pike = moment(lairPike);
					// находим новые циклы:
					var wheels = gate.getWheels(throwStick);
					this['wheels'][wheel] = wheels[wheel];
					this['lairs'][wheel] = 0;
					console.warn('newDragon bug fixed in ' + wheel + ' wheel!');
				}
			}
		}
		var info = "STAFF NEW | from stick - " + (stick != null);
		if (staff) {
			archive.saveStaff(info);
			board.showStick();
		}

		return this;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// возвращает момент по колесу и номеру спицы:
	this.spoke = function (wheel, num) {

		if (!this.pike) { console.log('UNKNOWN ERROR! pike is required!'); return null; }
		if ((!wheel) || (num == null)) {
			console.log("GET ERROR: wheel & spoke number is required!"); return null;
		};
		if (!this.wheels) { this.getArea(); };
		var spoke = this.wheels[wheel][num];
		if (!spoke) {
			console.log("UNKNOWN ERROR! spoke is not getting!"); return null;
		}
		return spoke;
	};

	// счётчик ротации
	this.rotate = null;

	// этот метод запускает эффект ротации точки по выбранному колесу:
	this.rotateStart = function(wheel, delay) {
		if (staff.rotate) return;
		if (!(wheel in Wheels)) return;
		var throwPike;
		var lair = staff['lairs'][wheel];
		var throwStick = new Stick(staff);
		var minDelay = 800;
		if (!delay || (delay < minDelay)) delay = minDelay;
		staff.rotate = setInterval(function() {
			throwPike = staff['wheels'][wheel][lair];
			throwStick.pike = moment(throwPike);
			clock.show(throwStick);	lair++;
			if (lair > 16) lair = 1;
		}, delay);
	};

	this.rotateStop = function() {
		if (!this.rotate) return;
		clearInterval(this.rotate);
		this.rotate = null;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// AUTO CREATE "STAFF":
	this.new(options);
	form.set(this);
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// END OF "STAFF" OBJECT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


