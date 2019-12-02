// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL OBJECT "BOARD":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// create();
// showStick(stick);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// при создании объекта класса Board запускается его метод "create"
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Board() { // options = {R, path.exists(path, callback); }

	// флаги активности элементов (вкл\выкл)
	this.flags = {
		'modals' : true,
		'spokes' : true,
		'buttons' : true,
		'spooler' : true,
		'menu' : true
	};

	// INNER FUNCTIONS:

    // это обработчик одинарного клика по спице -
    // показ информационной модалки по спицам:
    function spokeModalShow() {
    	// todo - create yii modals
    }
	
	// обработчик перемотки на спицу:
	function spokeClicker() {
		// если спицы выключены - выходим:
		if (!board['flags']['spokes']) return;
		if (clock.animated()) return;
		form.check(); // - корректируем локацию
		let newStick = new Stick();
		newStick.pike = staff.spoke(this.wheel, this.N);
		clock.show(newStick);
		if (clock.voyage) allTours.spokeClicker(this);
	}

	// рисуем точку с указанным рисунком в указанном колесе с атрибутами:
	function draw( Point, Img, wheel, id, appClass ) {
		let img, style, $item;
		let itemClass = 'btn btn-power';
		if( appClass ) {
			itemClass = itemClass + ' ' + appClass;
		}
		let point = {};
		if( !wheel || !id ) {
			console.log("wheel & id is required!");
			return;
		}

		if( ( Point !== 0 ) && !Point ) {
			console.log("Error: point is required!");
			return false;
		} else
			point = Point;

		if( Point <= 0 )
			point = getPercents( Point, 44.5 );

		img = ( !Img ) ? './img/star/starGreen.png' : Img;
		$('#' + id).remove();
		style = "position: absolute; right: " + point.x + "%; bottom: " + point.y + "%;";
		$item = $("<img  id='" + id + "' class='" + itemClass + "' src='" + img + "' style='" + style + "'>");
		$("#" + wheel + '>.wheel').append($item);
	}

	function btnHouse(wheel, key, func) {
		let btn = document.getElementById(wheel + '-' + key);
		btn.wheel = wheel;
		if( key === 'lair' ) {
			// одинарный клик и двойной - перемотка:
			btn.onclick = func;
			btn.ondblclick = func;
		} else btn.onclick = func;
	}

	// получаем название дома по колесу и номеру спицы:
        this.getHouse  = function (wheelKey, num, synt) {
            let syntBox = { 'nom' : 'nominative', 'gen' : 'genitive' };
            let wheelName, spokeName;

            // проверяем входящие данные:
            let invalidData = (wheelKey == null) || (num == null);
            if (invalidData) return null;

            // получаем колесо и спицу из текущей коробки:
            let spoke = allBoxes.getData('spoke', num);
            let wheel = allBoxes.getWheel(wheelKey);

            // проверяем запрашиваемый синтаксис а также его наличие:
            let defaultSynt = !synt || !(synt in syntBox) || !spoke['have']['case'] || !wheel['case'];
            if (defaultSynt) synt = 'nom';
			spokeName = (spoke['have']['uni'])? 
						spoke[synt] : 
						spoke[synt + '-' + wheelKey];
            if (wheel['sex'] && spoke['have']['sex']) {
                wheelName = wheel[synt][spoke.sex];
            } else { wheelName = wheel[synt]; };
            return (wheelName + ' ' + spokeName);
        };

	// CONSTANTS AND INNER GLOBALS:
	let activePower = 'power-active';
	let focusPower = 'power-focus';
	let staffRotator = {};

	// default styles of spokes:
	this.color = 	[
						'red', 'red', 'red', 'white', 'white', 'white', 'white', 'blue', 'blue', 
						'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow', 'red', 'red'
					];

	// флаг показа анимации:
	this.animationFlag = storage.get('flagAnim');

	// OUTER METHODS:
	
	this.animaToggle = function () {
		this.animationFlag = !this.animationFlag;
		storage.save('flagAnim', this.animationFlag);
	};

	// функция анимации движения стаффа по кругам:
	this.staffAnimation = function (prevStick, newStick) {

		// проверяем флаг анимации:
		if (!this.animationFlag) {
			// если выключен - показываем стафф без анимации и выходим:
			for( let wheel in Wheels )
				if( Wheels.hasOwnProperty( wheel ) ) {
					this.staffMove( wheel );
					this.showLair( wheel );
				}
			return true;
		}
		// иначе вычисляем и показываем анимацию...

		// функция подсчёта общей длительности анимации для всех трёх колёс:
		function getAnimTime(pikeDiff) {

			// если часы включены - анимация сверхскоростная:
			if (clock.run) return 100;

			// длительность анимации для разницы моментов меньше суток:
			let animTime = 400;

			// длительности анимации для разниц моментов больше суток, месяца и года:
			let animTimes = {
				'earth' : 700,
				'moon'  : 1100,
				'sun' 	: 1300
			};
			// выбираем и возвращаем нужную длительность:
			for (wheel in Wheels)
				if( Wheels.hasOwnProperty( wheel ) )
					if( pikeDiff > middleWheel[ wheel ] )
						animTime = animTimes[ wheel ];
			return animTime;
		}
		// ~~~~~~~~~~~~~~~~~~~~~~~~  end getAnimTime() ~~~~~~~~~~~~~~~~~~~~~~~
		
		// константа градусов в круге:
		let oneWheel = 360;

		// средние длительности циклов в миллисекундах:
		let middleWheel = {
			'earth'   : 86300000,
			'moon'  : 2520000000,
			'sun' : 31556700000
		};

		// рабочие объекты:
		let wheelCount = {};
		let finishGrad = {};
		let startGrad = {};

		if (!prevStick) prevStick = archive.getOldStaff();
		if (!newStick) prevStick = archive.getStaff();

		// почему-то в стафе и в анимации отсчёт градусов в разных напралениях)) конвертируем...
		for( wheel in Wheels)
			if( Wheels.hasOwnProperty( wheel ) ) {
				startGrad[wheel] = oneWheel - prevStick.angles[wheel];
				finishGrad[wheel] = oneWheel - newStick.angles[wheel];
			}

		// определяем направление вращения и разницу в моментах:
		let inFuture = prevStick.pike.isBefore(newStick.pike);
		let pikeDiff = Math.abs(prevStick.pike.diff(newStick.pike));

		// вычисляем конечные градусы анимации вращения:
		for (wheel in Wheels)
			if( Wheels.hasOwnProperty( wheel ) ) {
				// вычисляем количество целых витков вращения для каждого колеса:
				if (pikeDiff > middleWheel[wheel]) {
					wheelCount[wheel] = parseInt(pikeDiff / middleWheel[wheel]);
					if (wheelCount[wheel] > 3) wheelCount[wheel] = 3;
				} else { wheelCount[wheel] = 0;	}

				if (inFuture) {
				// вращение в отрицательные градусы - будущее
					if (startGrad[wheel] < finishGrad[wheel]) {
						finishGrad[wheel] = finishGrad[wheel] - oneWheel;
					}
					finishGrad[wheel] = finishGrad[wheel] - (oneWheel * wheelCount[wheel]);
				} else {
				// вращение в положительные градусы - прошлое
					let isPrevWheel = ( wheelCount[wheel] === 0) && (startGrad[wheel] > finishGrad[wheel]);
					if (isPrevWheel) { wheelCount[wheel] = 1; }
					finishGrad[wheel] = finishGrad[wheel] + (oneWheel * wheelCount[wheel]);
				}
			}

		// -------------------------------------------------------------------------

		// время анимации:
		let animTime = getAnimTime(pikeDiff);

		// запускаем анимацию:
		for (let wheel in Wheels) {
			clock.animate[wheel] = true;
			if (clock.run) startGrad[wheel] = finishGrad[wheel];
			staffRotator[wheel]
			.init(startGrad[wheel], finishGrad[wheel], animTime, this.showLair);
		}
		
		return true;
	};
	// ~~~~~~~~~~~~~~~~~~~~~~   end staffAnimation()  ~~~~~~~~~~~~~~~~~~~~~~~~~~````

	this.create = function() {
		let angle, point, id, $item;
		// создаём все спицы:
		for( let wheel in Wheels )
			if( Wheels.hasOwnProperty( wheel ) )
				for( let i = 0; i <= 16; i++ ) {
					angle = ANGS[ i ];
					if( i === 0 )  { angle = angle + 7 }
					if( i === 16 ) { angle = angle - 7 }
					point = getPercents( angle, 44.5 );
                    id = wheel + i;
					let spoke = allBoxes.getData('spoke', i);
					draw( point, spoke.src, wheel, id );
					$item = document.getElementById( id );
					$item.N = i;
					$item.angle = angle;
					$item.wheel = wheel;
					// todo - create yii modals:
					// $item.onclick = spokeModalShow;
					$item.onclick = spokeClicker;
					$item.ondblclick = spokeClicker;
					$($item).addClass('tip tipSpoke')
                        .attr('data-tip', wheel + '-spoke')
                        .attr('data-tooltip-content', '#tip');
				}
		// кликеры кнопок перемотки:
		for( wheel in Wheels )
			if( Wheels.hasOwnProperty( wheel ) ) {
				btnHouse( wheel, 'prev', btnPrev );
				btnHouse( wheel, 'lair', btnLair );
				btnHouse( wheel, 'next', btnNext );
			}

	};

	this.staffMove = function (wheel) {
		let newStick = archive.getStaff();
		let point = getPercents( newStick.angles[wheel], 36 );
		let $staff = $("#staff" + wheel);
		$staff.css('left', point.x + "%" ).css('bottom', point.y + "%");
	};

	this.createStaff = function( wheel ) {
		let newStick = archive.getStaff();
		let point = getPercents( newStick.angles[wheel], 36 );
		let Id = "staff" + wheel;
		draw( point, staff.img, wheel, Id, staff.Id );
	};

	this.createRotator = function (wheel) {
		let Axis = { x: 132, y: 132 };
		let Radius = 100;
		let Id = '#staff' + wheel;
		if ($(Id).length) {
			staffRotator[wheel] = new Rotator(wheel, Axis, Radius);
		} else {
			console.log("staff ", Id, ' is not found! His rotator not created!');
		}
	};

	// этот метод перезагружает весь экран, меню, метки, типсы...
	this.reload = function() {
        allTips.init();
        allLabels.translate('body');
		for( wheel in Wheels )
			if( Wheels.hasOwnProperty( wheel ) )
				this.showLair( wheel );
	};

	this.showStick = function(newStick) {
		if (!newStick) { newStick = new Stick(staff); }
		let prevStick = archive.getOldStaff();

		// чистим доску от активных классов:
		for( let wheel in Wheels )
			if( Wheels.hasOwnProperty( wheel ) ) {
				let newLair = newStick.lairs[wheel] !== prevStick.lairs[wheel];
				if (newLair) {
					let prevSpokeId = '#' + wheel + prevStick.lairs[wheel];
					$(prevSpokeId).removeClass(activePower);
					$(prevSpokeId).removeClass(focusPower);
				}
			}

		// показываем анимацию:
		this.staffAnimation(prevStick, newStick);
	};

	// показываем название домов на кнопках под колёсами:
	this.showLair = function (wheel) {
		let newStick = new Stick(staff);
		let house, houseBtn, lairColor;
		house = board.getHouse(wheel, newStick.lairs[wheel]);
		houseBtn = document.getElementById(wheel + '-lair');
		if (houseBtn) { 
			houseBtn.firstChild.nodeValue = house;
			houseBtn.N = newStick.lairs[wheel];
		}
		lairColor = board.color[newStick.lairs[wheel]];
		for( let color in storage.colors )
			if( storage.colors.hasOwnProperty( color ) )
				$('.btn-' + wheel).removeClass( color );

		$('.house-' + wheel).removeClass(focusPower);
		$('.btn-' + wheel).addClass(lairColor);
		if (newStick.lairsFlag[wheel])
			$('.house-' + wheel).addClass(focusPower);

		let spokeId = '#' + wheel + newStick.lairs[wheel];
		if (newStick.lairsFlag[wheel]) {
			$(spokeId).addClass(focusPower);
		} else
			$(spokeId).addClass(activePower);

		// снимаем флаг активной анимации с этого колеса:
		clock.animate[wheel] = false;
	};

	// BOARD SELF-CREATION:
	this.create();
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// END OF "BOARD" OBJECT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Rotator( wheel ) {

    // обязательные опции конструкции аниматора: 
    // строка для выборки элемента ротации:
    
    let $staff;

    // проверяем данные конструкции:
    if (!wheel) { console.log("element is requared!"); return null; }
    else {
        // Кэширует объект jQuery в целях производительности.
        let Id = "#staff" + wheel;
        $staff = $(Id);
        if (!$staff.length) { console.log("element not found!"); return null; }
    }

    // ---------------------------------------------------------------
    // Публичный метод запуска анимации:
    // ---------------------------------------------------------------
    this.init = function (totalGradStart, totalGradFinish, totalTime, callback) {

        let fadeTime = 700;

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // проверка входящих данных
        // Обязательные опции запуска: градусы и время
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let invalidGrads = (totalGradStart == null) || (totalGradFinish == null);
        if (invalidGrads) { console.log('start and finish gradus is requared!'); return null; }
        if (totalTime == null) { console.log('time is required!'); return null; }

        // меняем градусы на радианы:
        let start = radian(totalGradStart);
        let finish = radian(totalGradFinish);
        
        // запускаем анимацию:
        // Шаг 1: Установите свойство модели на угол исходной позиции
        //          Мы используем text-indent, так как оно ничего не делает с изображением.
        $staff.css('text-indent', start);
        
        // Шаг 2: Мы устанавливаем jQuery.animate() для анимации посредством....
        $staff.animate(

            // ... вначале устанавливая окончательное значение text-indent в радианах 
            { 'text-indent': finish }, 
            {           
                /* ... далее мы устанавливаем функцию шага step, которая станет генерировать кадр при угле, хранимом в свойстве text-indent в этой отдельной части анимации.  Формулы, применяемые для координат x и y, получены с помощью полярного уравнения окружности...  */

                step: function( now ) {
                    let point = getPercents( now, 36, true );
                    $staff.css('right', point.x + '%')
                           .css('top', point.y + '%');

                    $staff.clone().removeAttr("id")
                    .appendTo($staff.parent())
                    .fadeOut(fadeTime, function() { $(this).remove(); });
                },
                
                // Так устанавливается длительность анимации:
                duration: totalTime,
                
                // Свойство easing аналогично функции CSS3 
                // animation-timing-funciton
                easing: 'linear',
                
                // По окончании анимации:
                complete: function() { 
                    // вызываем обратную связь для конкретного ротатора:
                    if (callback && typeof(callback) === 'function') {
                        callback(wheel);
                    }
                }
            }
        ); // animate end
    } // init end
}


function radian( grad ) {
    let PI = 3.14159;
    return ( ( grad * PI ) / 180 );
}

function getPercents( ang, coefficient, isRadian ) {
    let point = {};
    ang = ( ( ang < 0 ) && ( ang >= -16 ) ) ?
        ANGS[ ang * ( -1 ) ] : ang;
    let rad = isRadian ? ang : radian( ang );
    point.x = 45 - Math.cos( rad ) * coefficient;
    point.y = 45 + Math.sin( rad ) * coefficient;
    return point;
}