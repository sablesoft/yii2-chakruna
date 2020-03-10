function upNav(){
	var anchor = this.parentNode.anchor;
	switch (anchor){
		case '#sun-anchor': return;
		case '#moon-anchor': this.parentNode.anchor = "#sun-anchor"; break;
		case '#earth-anchor': this.parentNode.anchor = "#moon-anchor"; break;
	}
	this.href = this.parentNode.anchor + this.xs;
}

function downNav(){
	var anchor = this.parentNode.anchor;
	switch (anchor){
		case '#sun-anchor': this.parentNode.anchor = "#moon-anchor"; break;
		case '#moon-anchor': this.parentNode.anchor = "#earth-anchor"; break;
		case '#earth-anchor': return;
	}
	this.href = this.parentNode.anchor + this.xs;	
}

// опция добавления новых языков:
function addLangOption() {
	console.warn('addLangModal required!');
}

// опция редактирования текущего языка:
function editLangOption() {
	console.warn('editLangModal required!');
}

// опция добавления новых наборов:
function addBoxOption() {
	console.warn('addBoxModal required!');
}

// опция редактирования текущего языка:
function editBoxOption() {
	console.warn('editBoxModal required!');
}

// универсальный переключатель для всех опций:
function optionToggle() {
	// срабатывает только когда нет активного показа анимации:
	if (clock.animated() && !clock.run) return;

	// определяем ключ опции:
	var key = $(this).data('key');
	switch (key) {
		case 'anima'	: board.animaToggle(); break;
		case 'tips' 	: allTips.toggle();    break;
		default: if ($(this).hasClass('option-quotes'))	allQuotes.toggle(key);
	}
	$(this).toggleClass('active');
	return true;
}

// кликер туров:
function tourClicker() {
	// срабатывает только когда нет активного показа анимации:
	if (clock.animated() && !clock.run) return;
	// а также нет активных туров:
	if (clock.voyage) return;

	var key = $(this).data('key');
	allTours.start(key);
}

// Wheels Spoolers:
// ===================================================
function btnLair() {
	// если спулер отключен - выходим
	if (!board['flags']['spooler']) return;
	// если анимация - тоже выходим
	if (clock.animated() && !clock.run) return;
	var lair = staff.getLair(this.wheel);
	form.check();
	clock.show({ pike: lair });
	if (clock.voyage) allTours.spoolClicker(this.wheel);
}

function btnPrev() {
	spoolingWheel(this.wheel, false);
}

function btnNext() {
	spoolingWheel(this.wheel, true);
}

function spoolingWheel(wheel, next) {
	// если спулер отключен - выходим
	if (!board['flags']['spooler']) return;
	// если анимация - тоже выходим
	if (clock.animated() && !clock.run) return;
	// выбираем сперва начало или конец данного цикла:
	var throwPike = (next)? 
			moment(staff['wheels'][wheel][16]) : 
			moment(staff['wheels'][wheel][0]);
	// затем добавляем или отнимаем 10 часов:
	if (next) {throwPike.add(10, 'hours'); } else { throwPike.subtract(10, 'hours'); }
	// запоминаем старый дом:
	var oldLair = staff.lairs[wheel];
	form.check();
	var wheels = {};
	var throwStick = new Stick(staff);
	throwStick.pike = moment(throwPike);
	// находим новые циклы:
	wheels = gate.getWheels(throwStick);
	// проверяем чтобы спица не была последней:
	if (!next && (oldLair == 16)) oldLair = 0;
	// устанавливаем ту же спицу но в новом цикле:
	throwStick.pike = moment(wheels[wheel][oldLair]);
	clock.show(throwStick);
	if (clock.voyage) allTours.spoolClicker(wheel, next);
}
// ===================================================

function btnRecord() {
	// если кнопки отключены - выходим
	if (!board['flags']['buttons']) return;
	// если анимация - тоже выходим
	if (clock.animated() && !clock.run) return;
	form.check();
	var num;
	var stick = form.get();
	for (var i = 0; i < 3; i++) {
		num = storage.number('gps', stick.gps, i);
		if (num != null) {
			storage.edit('gps', stick.gps, num);
			form.editLocal(num);
			return num;
		};
	};
	num = storage.save('gps', stick.gps);
	if (num != null) {
		storage.current('gps', num);
		form.addLocal(num);
		return true;
	} else return null;
}

function btnPresent() {
	// если кнопки отключены - выходим
	if (!board['flags']['buttons']) return;
	// если анимация - тоже выходим
	if (clock.animated() && !clock.run) return;
	form.check();
	clock.present();
	if (clock.voyage) allTours.presentClicker();
}

function btnShow() {
	// если кнопки отключены - выходим
	if (!board['flags']['buttons']) return;
	// если анимация - тоже выходим
	if (clock.animated() && !clock.run) return;
	form.check();
	clock.show();
	if (clock.voyage) allTours.showClicker();
}