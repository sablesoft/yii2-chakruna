let allTours = {

	// расширение пакетов:
	'post' : '_tour.json',
	'stor' : 'tour_',
	// тип пакетов (он же имя папки на сервере):
	'packType' : 'tours',

	// кейс со всеми доступными турами
	// ключ - служебное название тура
	// значение - тип тура
	// (например: 'introRU' : 'intro')
	'tours' : {},

	// все языки туров (возможно понадобится):
	'langs'	: {},

	// язык по умолчанию:
	'defaultLng' : 'ru',
	// текущий язык клиента:
	'currentLng' : null,

	// активный тур:
	'activeTour' : null,

	// флаг замены шага:
	'debugStep'	 : false,

	// служебные счётчики применяются различными сценариями шагов:
	'workCounter' : 0,
	'checkStep': null,
	'flagsCash' : {},

	// это кейс с частями каждого объекта тура:
	'parts' : {
		'lang'			: 'lang chars',
		'key'			: 'this tour key name',
		'title'			: 'full tour name',
		'author'		: 'author of this tour',
		'translator'	: 'translator of this tour',
		'desc'			: 'description of this tour',
		'steps'			: 'array of tour steps',
		'options'		: 'options of this tour',
		'startOptions'	: 'object of tour start options',
		'presActions'	: 'object of labels for presClicker',
		'showActions'	: 'object of labels for showClicker',
		'spokeActions'	: 'object of labels for spokeClicker',
		'spoolActions'	: 'object of labels for spoolClicker',
		'initActions'	: 'object of labels for initStep'
	},

	// ==================================================================================
	// это методы для работы со служебным счётчиками:
	// ==================================================================================
	
	counter: function(num) {
		if (num == null) return allTours['workCounter'];
		allTours['workCounter'] = num;
		// console.info('counter = ' + allTours['workCounter']);
	},

	addCounter: function(num) {
		if (!num) {
			++allTours['workCounter'];
		} else {
			var newNum = allTours.counter() + num;
			allTours.counter(newNum);
		}
	},

	setCheck: function() {
		var tour = allTours['activeTour'];
		if (!tour || !tour['_inited']) return null;
		allTours['checkStep'] = tour['_current'];
		return allTours['checkStep'];
	},

	clearCheck: function() {
		allTours['checkStep'] = null;
	},

	// ==============================================================================================
	// этот метод возвращает готовый тур по заданному ключу
	// ==============================================================================================
	
	get: function(key) {
		// эта локальная функция ищет номер шага по заданной метке:
		function getStepNum(label) {
			for (var x = 0; x < (tour['_options']['steps']).length; x++) {
				var step = tour.getStep(x);
				if (step['label'] && (step['label'] == label)) return x;
			}
			return null;
		}

		// эта локальная функция обрабатывает старт тура:
		function startOptions(tour) {
			var key = tour['_options']['name'];
			var options = allTours[key]['startOptions'];
			if (!options) return;
			// устанавливаем флаги активности элементов программы во время тура:
			for (var flag in board['flags']) {
				if (flag in options)
					allTours['flagsCash'][flag] = board['flags'][flag];
					board['flags'][flag] = options[flag];
			}
			// устанавливаем флаг активности тура:
			clock.voyageStart();
			// кэшируем тур:
			allTours.active(tour);
		}

		function endOptions(tour) {
			var options = allTours['flagsCash'];
			for (var flag in options) {
				board['flags'][flag] = options[flag];
			}
			allTours['flagsCash'] = {};
			clock.voyageEnd();
			// останавливаем ротацию, на всякий пожарный :)
			staff.rotateStop();
			clock.present();
		}

		// это костыль против багов таур-бутстрапа - антиглючная функция отображения шагов:
		function debugOrder(tour) {
			allLabels.translate();
			var curr = tour.getCurrentStep();
			var key = tour['_options']['name'];
			var step = tour.getStep(curr);
			// console.info('debug checking in step ' + curr);
			// если не меняли шаг - меняем:
			if (!allTours['debugStep']) {
				var bodyClass = 'tour-' + key + '-element';
				var bodyClassNum = 'tour-' + key + '-' + curr + '-element';
				allTours['debugStep'] = true;
				$('body').removeClass(bodyClass).removeClass(bodyClassNum);
				if (step['placement'] !== "") $('.popover').remove();
				$('.tour-backdrop').remove();
				// console.log('bug step clean!');
				tour.goTo(curr); return;
			}
			// console.info('debug checking end: ' + curr);
			// проверяем шаг на действия инициации:
			var initStep = 'initActions';
			var code = allTours.getAction(initStep); if(!code) return;
			var action = new Function('tour', code); action(tour);
		}

		// это антиглючная функция для перехода на следующий шаг:
		function debugNext() { allTours['debugStep'] = false; }

		// -------------------------------- get ---------------------------------
		
		// всяческие проверки данных:
		var validKey = (key != null) && (key in this['tours']);
		if (!validKey) {
			console.warn('invalidKey!');
			return null;
		}

		// определяем флаг клавиатуры:
		var arrowsFlag = false;
		var options = allTours[key]['startOptions'];
		if (options && (options['arrows'] != null)) arrowsFlag = options['arrows'];

		// если всё в порядке - создаём тур:
		var tour = new Tour({
			name: key,
			storage: false,
			orphan : true,
			keyboard: arrowsFlag,
			template: xhatClient.getHTML('tour-step'),
			onStart: startOptions,
			onShown: debugOrder,
			onNext: debugNext,
			onEnd: endOptions		
		});
		// а затем наполняем его шагами:
		tour.addSteps(this[key]['steps']);
		// возвращаяем готовый тур:
		return tour;
	},

	// ===========================================================================
	// этот метод создаёт тур по ключу и сразу его запускает:
	// ===========================================================================
	
	start: function (key) {
		// всяческие проверки данных:
		var validKey = (key != null) && (key in this['tours']);
		if (!validKey) {
			console.warn('invalidKey!');
			return null;
		}
		var tour = allTours.get(key);
		tour.init(); tour.start();
	},

	// ===========================================================================
	// кэшируем активный тур либо возвращаем текущий активный:
	// ===========================================================================
	
	active: function(tour) {
		if (!tour) return allTours['activeTour'];
		allTours['activeTour'] = tour;
	},

	// =======================================================
	// этот метод возвращает код функции - 
	// действие для активного тура на данном шаге
	// согласно данному списку действий тура:
	// ======================================================
	
	getAction: function(actionsKey) {
		function validLabel() {
			// определяем текущий шаг:
			var num = tour['_current'];
			var step = tour.getStep(num);
			// проверяем наличие на нём метки:
			if (!step['label']) return false;
			var label = step['label'];
			// проверяем у активного тура данный объект действий
			// на наличие этой метки:
			if (label in actions) { 
				// console.log('label in ' + actionsKey + ': ' + label);
				return label;
			} else return false;
		}
		// проверяем объект действий:
		if (!actionsKey) return null;
		// проверяем наличие активного тура:
		var tour = allTours.active();
		if (!tour || !tour['_inited']) return;
		// определяем тур:
		var key = tour['_options']['name'];
		// проверяем наличие объекта действий у этого тура:
		var actions = allTours[key][actionsKey]; if (!actions) return null;
		// проверяем валидность метки:
		var label = validLabel(); if (!label) return null;
		// возвращаем код действия:
		return actions[label];
	},

	// ===========================================================================
	// этот метод реагирует на нажатие зелёной кнопки при активном туре:
	// ===========================================================================

	presentClicker: function() {
		var actionsKey = 'presActions';
		var tour = allTours.active();
		// получаем и проверяем код действия:
		var code = allTours.getAction(actionsKey); if(!code) return;
		// создаём действие и выполняем его:
		var action = new Function('tour', code); action(tour);
	},

	// ===========================================================================
	// этот метод реагирует на нажатие синей кнопки показа при активном туре:
	// ===========================================================================

	showClicker: function() {
		var actionsKey = 'showActions';
		var tour = allTours.active();
		// получаем и проверяем код действия:
		var code = allTours.getAction(actionsKey); if(!code) return;
		// создаём действие и выполняем его:
		var action = new Function('tour', code); action(tour);
	},

	// ===========================================================================
	// этот метод реагирует на нажатие спиц во время показа туров:
	// ===========================================================================

	spokeClicker: function(spoke) {
		var actionsKey = 'spokeActions';
		var tour = allTours.active();
		// получаем и проверяем код действия:
		var code = allTours.getAction(actionsKey);
		if(!code) return;
		// создаём действие и выполняем его:
		var action = new Function('tour, spoke', code); action(tour, spoke);
	},

	// ==============================================================================================
	// этот метод реагирует на нажатие перемоток циклов во время показа туров:
	// ==============================================================================================
	
	spoolClicker: function(wheel, next) {
		var actionsKey = 'spoolActions';
		var tour = allTours.active();
		// получаем и проверяем код действия:
		var code = allTours.getAction(actionsKey); if (!code) return;
		// создаём действие и выполняем:
		var action = new Function('tour, wheel, next', code);
		action(tour, wheel, next);
	},

	// ==============================================================================================
	// этот метод выполняет необходимые процедуры при завершении тура:
	// ==============================================================================================
	
	end: function () {	allTours['activeTour'] = null;	},

	// ==============================================================================================
	// этот метод возвращает список ключей туров,
	// имеющихся для текущего языка:
	// ==============================================================================================
	
	getTours: function() {
		var currLng = this['currentLng'];
		var currTours = new Array();
		var currKeys = this['langs'][currLng];
		if (currKeys)
			for (var x = 0; x < currKeys.length; x++) {
				var tour = {};
				tour['key'] = currKeys[x];
				tour['title'] = this[currKeys[x]]['title'];
				currTours.push(tour);
			}
		return currTours;
	},

	// ==============================================================================================
	// этот метод устанавливает данный язык или возвращает текущий
	// ==============================================================================================
	
	currLang: function (lang) {
        if (lang == null) {
            if( this.currentLng )
                return this.currentLng;
            if( !storage ) {
                lang = this.defaultLng; // todo - global env
            } else {
                lang = storage.get('lang');
                if( !lang )
                    lang = this.defaultLng;
            }
        }
		let validLang = lang in this.langs;
		if (!validLang) {
            console.warn(lang,' - invalid language!');
            return this.currentLng = this.defaultLng;
		}
		this['currentLng'] = lang;
		return this['currentLng'];
	},

	// ==============================================================================================
	// этот метод добавляет новый язык если требуется,
	// а также новый ключ тура в массив ключей этого языка:
	// =============================================================================================

	addLang: function(lang, key) {
		// проверка наличие элемента в массиве:
		function inArr(arr, el) {
			if (!arr || (el == null)) return null;
			var pos;
			for (var x = 0; x < arr.length; x++) {
				if (arr[x] == el) return true;
			}
			return false;
		}
		// проверяемя язык и ключ:
		if (!lang || !key) return null;
		// если языка нет - добавляем:
		if (!(lang in allTours['langs']))
			allTours['langs'][lang] = new Array();
		// если ключа нет в массиве ключей данного языка - добавляем:
		if (!inArr(allTours['langs'][lang], key)) 
			(allTours['langs'][lang]).push(key);
	},

	// ==============================================================================
	// этот метод устанавливает конкретный набор из списка пакетов json
	// ==============================================================================

	install: function(pack) {
		if (!pack) { console.warn('not have pack for install!'); return null;}
		var key = pack['key'];
		if(!key) { console.error('pack not have key for install!'); return null; }
		allTours[key] = {};
		var lang = pack['lang'];
		if (!lang) lang = null;
		// сохраняем название тура и его язык в списке:
		allTours['tours'][key] = lang;
		// добавляем элементы тура в его объект:
		for( var el in pack )
			if ( el in allTours['parts'] ) allTours[key][el] = pack[el];
		// добавляем язык в список языков, если необходимо:
		allTours.addLang(lang, key);
		// пересохраняем пакет в хранилище:
		var jsonKey = allTours['stor'] + pack['key'];
		storage.save(jsonKey, pack);
		var listKey = allTours['stor'];
		storage.updateList(listKey, jsonKey);
	},

	// ==============================================================================
	// этот метод распаковывает все наборы пакетов json из списка
	// ==============================================================================
	
	update: packUpdate,
	
	// ==============================================================================
	// этот метод загружает и устанавливает пакеты этого объекта из хранилища
	// ==============================================================================
	
	load: listLoad	
};