let storage, gate, board, clock, staff, form, history;

// ===================================================================================
//                      WINDOW INIT
// ===================================================================================

window.onload = function() {

	// мотаем вверх и равняем всё по центру экрана:

	// вешаем кликеры на все основные кнопки: 
	buttonsClicker();

	// допиливаем ховер меню:
	hideMenu();

	// инициируем глобальные объекты:
	clock = new Clock();
	storage = new Storage();
    xhatClient = new xHat();
	archive = new Archive();
	gate = new Gate();
	form = new Form();
	staff = new Staff();
	archive.saveStaff("STARTING INIT!");

	// устанавливаем обрабочики фокуса и блюра элементов формы:
	$('input').each(function(i, input) {
		input.onfocus = form.pause;
		input.onblur = form.show;
	});

	// обновляем данные с сервера:
    allPacksUpdate();

	// создаём доску из имеющихся данных хранилища:
	boardInit();
};

// ~~~~~~~~~~~~~~~~~~~ WINDOW INIT END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// эта функция запускает показ главного экрана программы:
function boardInit() {
	// загружаем объекты из хранилища:
	if (!transLoad()) return;
	let lang = jQuery('body').data('lang');
	storage.current('lang', lang);
	board = new Board();
	// создаём доску, колёса, стафф и его ротаторы:
	for( let wheel in Wheels )
		if( Wheels.hasOwnProperty( wheel ) ) {
			board.createStaff( wheel );
			board.showLair( wheel );
			board.createRotator( wheel );
		}

	board.reload();
	
	// создаём лист локаций:
	form.createLocalList();

	// запускаем часы:
	clock.start();
}

// функция вешает кликеры на все основные кнопки:
function buttonsClicker() {
	function btnClick( id, func, anchor, xs ) {
		let btn = document.getElementById( id );
		btn.onclick = func;
		if (anchor) btn.parentNode.anchor = anchor;
		if (xs) { btn.xs = xs } else { btn.xs = ''}
	}

	// NAV BUTTONS:
	
	btnClick('btn-sm-up', upNav, '#sun-anchor');
	btnClick('btn-sm-down', downNav);
	btnClick('btn-xs-up', upNav, '#sun-anchor', '-xs');
	btnClick('btn-xs-down', downNav, '', '-xs');

	// BOARD BUTTONS:

	btnClick('btn-show', btnShow );
	btnClick('btn-show-xs', btnShow);
	btnClick('btn-show-sm', btnShow);
	btnClick('btn-now', btnPresent);
	btnClick('btn-now-xs', btnPresent);
	btnClick('btn-now-sm', btnPresent);
	btnClick('btn-save', btnRecord);
	btnClick('btn-save-xs', btnRecord);
	btnClick('btn-save-sm', btnRecord);
}

// эта функция прячет меню при покидании мышки:
function hideMenu() {
	$('#menu').children().each(function(){
		$(this).on('mouseleave', function() {
			$(this).find('a').attr('aria-expended', false);
			$(this).removeClass('open');
		});
	});	
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL OBJECT "FORM":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// set(stick);
// get(key);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// при создании объекта класса "Form" ничего не происходит
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Form() {

	this.pause = function() {
		clock.formPause();
	};

	this.show = function() {
		clock.formShow();
	};

	this.set = function(stick) {
		if (!stick) { stick = new Stick(staff); }
		document.inForm.elements["date"].value = stick.pike.format('YYYY-MM-DD');
		// для формы тоже можно применять селекторы jQuery:
		// console.log($('#inForm input[name="date"]').val());
		document.inForm.elements["time"].value = stick.pike.format('HH:mm');
		document.inForm.elements["local"].value = stick.gps.local;
		document.inForm.elements["lat"].value = stick.gps.lat;
		document.inForm.elements["lng"].value = stick.gps.lng;
	};

	this.get = function( key ) {
		let Data = {}, stick = {}, gps = {};
		let date = document.inForm.elements["date"].value; Data.date = date;
		let time = document.inForm.elements["time"].value; Data.time = time;
		gps.local = document.inForm.elements["local"].value; Data.local = gps.local;
		let str = String(date + ' ' + time);
		stick.pike = moment(str); Data.pike = stick.pike;
		gps.lng = document.inForm.elements["lng"].value; Data.lng = gps.lng;
		gps.lat = document.inForm.elements["lat"].value; Data.lat = gps.lat;
		stick.gps = gps; Data.gps = gps; Data.stick = stick;
		if( !key ) { return stick; }
		let keyData = Data[key];
		if (keyData) { return keyData; } else { return stick; }
	};

	this.createLocalList = function() {
		$('#local').children().remove();
		for( let i = 0; i < storage.count( 'gps' ); i++ ) {
			this.addLocal( i );
		}
	};

	// проверяет, поменялась ли локация
	this.check = function() {
		let stick = this.get();
		let num = storage.number('gps', stick.gps, 1);
		if( ( num != null ) && ( num != storage.current('gps') ) ) {
			storage.current('gps', num);
			stick.gps = storage.get('gps');
			this.set( stick );
		}
	};

	this.addLocal = function( num ) {
		if( num == null )
			num = storage.current( 'gps' );
		let gps = storage.get( 'gps', num );
		$('#local').append("<option id='gps"+ num + "'>" + gps.local + "</option>");
	};

	this.editLocal = function( num ) {
		let gps = storage.get( 'gps', num );
		jQuery( '#gps' + num ).children(0).text( gps.local );
	};
}
