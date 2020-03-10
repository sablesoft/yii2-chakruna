let allLabels = {

	// расширение пакетов:
	'post' : '_labels.json',
	'stor' : 'labels_',
	// тип пакетов (он же имя папки на сервере):
	'packType' : 'labels',
	
	// это кейс с ключами всех меток для быстрого доступа к ним:
	'keys' : {

		// ================================================================
		// метки на главной странице программы (обязательные для перевода!!):
		// ================================================================
		
		// главный заголовок программы:
		'mainTitle'		: 'main title of application',

		// метки формы внизу:
		'date'			: 'date of show moment',
		'time'			: 'time of show moment',
		'local' 		: 'locale of show moment',

		// метки верхнего меню:
		'editLang'		: 'edit current lang',
		'addLang'		: 'add lang option',
		// заголовок наборов:
		'boxes' 		: 'style boxes of application',
		'editBox'		: 'edit current box',
		'addBox'		: 'append new box',
		// заголовок опций:
		'options'	 	: 'application options',
		// общие опции:
		'anima'			: 'animation option',
		'tips' 			: 'tooltips option',
		'orbitalCulture': 'Orbital Culture of Unity', // вторая закладка модалки спиц
		'ezoWorld'		: 'info from ezoteric world', // третья закладка модалки спиц
		// опции цитат:
		'quotes'		: 'quotes option',

		// мануал и туры:
		'manual' 		: 'application manuals and tours',
		'editTour'		: 'edit tours',
		'addTour'		: 'add new tour',
		'prevStep'		: 'previus step',
		'nextStep'		: 'next step',
		'endTour'		: 'end of this tour',

		// метки четвертей колёс:
		'morning' 		: 'morning earth quarter',
		'morning-day'	: 'middle between',
		'day' 			: 'day earth quarter',
		'day-evening'	: 'middle between',
		'evening'		: 'evening earth quarter',
		'evening-night'	: 'middle between',
		'night'			: 'night earth quarter',
		'night-morning' : 'middle between',
		'growing' 		: 'growing moon quarter',
		'growing-full'	: 'middle between',
		'full' 			: 'full moon quarter',
		'full-waning'	: 'middle between',
		'waning' 		: 'waning moon quarter',
		'waning-new'	: 'middle between',
		'new' 			: 'new moon quarter',
		'new-growing'	: 'middle between',
		'spring' 		: 'spring sun quarter',
		'spring-summer'	: 'middle between',
		'summer' 		: 'summer sun quarter',
		'summer-autumn'	: 'middle between',
		'autumn' 		: 'autumn sun quarter',
		'autumn-winter'	: 'middle between',
		'winter' 		: 'winter sun quarter',
		'winter-spring'	: 'middle between',

		// ---------------------------------------------------
		// метки модальных окон (обязательные для перевода:)
		// ---------------------------------------------------
		
		// заголовок первой вкладки: 
		// 'shamWheel'		: 'shamanic wheel - translate',
		// пик времени, префиксы:
		'lairPike'		: 'pike of spoke translate',
		'timeBefore'	: 'before time prefix',
		'beforePost'	: 'before postfix',
		'timeAfter'		: 'after time prefix',
		'timeNow'		: 'now time prefix',
		// длительности времени:
		// значение ключей с множественным числом - ключи единственного числа! :)
		'ayear'			: 'one year label',
		'years'			: 'ayear',
		'amonth'		: 'one month label',
		'months'		: 'amonth',
		'aweek'			: 'one week label',
		'weeks'			: 'aweek',
		'aday'			: 'one day label',
		'days'			: 'aday',
		'ahour'			: 'one hour label',
		'hours'			: 'ahour',
		'aminute'		: 'one minute label',
		'minutes'		: 'aminute',
		// фазы циклов:
		'sunTime'		: 'sun phase',
		'moonTime'		: 'moon phase',
		'earthTime'		: 'sun phase',

		// содержимое второй вкладки orbitalCulture (необязательны для перевода:)
		'lairDesc'		: 'current lair general description',
		'holidays'		: 'holidays and ceremonies of current lair',
		'festivals'		: 'world festivals of current lair',

		// содержимое третьей вкладки ezoWorld (необязательны для перевода:)
		'spokeDesc'		: 'info about this spoke direction',
		'spokeElement'	: 'world element of current spoke',
		'powerPref'		: 'translate of current power prefix'
	},

	// =============================================================
	// это кейс с ключами частей составных меток (порядок массивов важен):
	// =============================================================
	'parts'		: {

				'durations': [ 'years', 'months', 'weeks', 'days', 'hours', 'minutes' ],

				'sunTime'  : [ 	'spring', 'spring-summer', 'summer', 'summer-autumn', 
								'autumn', 'autumn-winter', 'winter', 'winter-spring' ],
				'moonTime' : [ 	'growing', 'growing-full', 'full', 'full-waning', 
								'waning',  'waning-new',   'new',  'new-growing' 	 ],
				'earthTime': [ 	'morning', 'morning-day', 'day', 'day-evening', 
								'evening', 'evening-night', 'night', 'night-morning' ]
			},

	// =============================================================
	// это кейс со всеми имеющимися языками:
	// =============================================================
	'langs' : { 
				// // английский - язык по умолчанию 
				// 'en' : 'default',
				// // русский - встроенный
				// 'ru' : 'embedded'
			},
	// (дополняется новыми языками при вызове метода addLang(lang, labelsTranslate) )
	
	// ----------------------------------------------------------------

	// язык подсказок по умолчанию:
	'defaultLng' 	: 'en',

	// ----------------------------------------------------------------

	// текущий язык показа подсказок:
	'currentLng'	: null,

	'initiated' : false,

	// ============================================================================
	// ============================================================================

	// этот метод добавляет новые языки к уже существующим в кейсе типсам
	// он принимает название языка и объект с переводами типсов
	addLang : 	function(lang, labelsTranslate) {
		if (!lang || !labelsTranslate) {
			console.log("languege name & labels translate is requared!");
			return null;
		}
		if (lang.length > 2) {
			console.log('please, use two standart symbols for your languege name!');
			return null;
		}
		var newLang = !(lang in this.langs);
		if (newLang) {
			// console.log('your languege is new, adding...');
			this.langs[lang] = 'custom'; 
		}
		for (var label in labelsTranslate) {
			// проверяем каждую метку из пришедшего перевода:
			var badLabel = !(label in this.keys);
			if (badLabel) continue;

			// вносим новый перевод типса в структуру меток:
			this[label][lang] = labelsTranslate[label];
		}
	},

	// ----------------------------------------------------------------

	// этот метод устанавливает текущий язык показа меток
	// если он имеется в кейсе языков 'langs'
	currLang : 	function(lang) {
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
		this.currentLng = lang;
		return this.currentLng;
	},
	// если такого языка нет - язык не меняется и возвращается null

	// ----------------------------------------------------------------
	
	// этот метод принимает ключ и после всех проверок выдаёт по нему нужную метку 
	getLabel: function(key) {
		var validKey = key in this.keys;
		if (!validKey) {
			console.log('invalid key:', key);
			return null;
		}
		var label = {};
		label.text = this[key][this.currentLng];
		if (!label) {
			console.log('Not have label', label, 'for current languege -', this.currentLng);
			return null;
		}
		label['key'] = key;
		label['lang'] = this.currentLng;
		return label;
	},
	// если такой метки нет - возвращается null
	
	// ----------------------------------------------------------------
	
	// этот метод возвращает ключ фазы для заданной спицы в заданном колесе
	getPhase: function(num, wheel) {
		// проверяем данные:
		var invalidData = (num == null) || (num < 0) || (num > 16) || !(wheel in Wheels);
		if (invalidData) return null;
		var index = gate.getQuarter(num);
		var key = this.parts[wheel + 'Time'][index];
		return key;
	},

	// ----------------------------------------------------------------
	
	// этот метод возвращает готовую строку длительности на текущем языке
	getDuration: function(diff) {
		// проверяем данные:
		if (!diff) return null;
		var currLang = this.currentLng;
		// определяем время пика и добавляем нужную строку:
		var isFuture = diff > 0;
		var durString = (isFuture)? this['timeAfter'][currLang] : this['timeBefore'][currLang];
		// начинаем считать длительности:
		var durKey, dur;
		var maxLevels = 1; // подробность строки - два уровня
		var level = 0; // текущий уровень подсчёта
		var durations = this['parts']['durations']; // массив с длительностями
		for (var x = 0; x < durations.length; x++) {
			durKey = durations[x];
			if (durKey == 'weeks') { dur = diff.weeks(); } else { dur = diff._data[durKey]; }
			if (dur) { 
				durString += (Math.abs(dur) == 1) ?
					' ' + this[this['keys'][durKey]][currLang] :
					' ' + Math.abs(dur) + ' ' + this[durKey][currLang];
				level++;
			}
			// когда нужный уровень подробности достигнут:
			if (level == maxLevels) {
				if (!isFuture) durString += ' ' + this['beforePost'][currLang];
				durString += ':';
				return durString;
			}
		}
	},

	init: function() {
		if (this.initiated)
			return;
		this.load();
		this.currLang();
		this.initiated = true;
	},

	// ----------------------------------------------------------------

	// этот метод переводит все метки, 
	// имеющиеся на момент запуска перевода на этой странице на текущий язык
	translate: function(parentId) {
		this.init();
		if (!parentId) parentId = 'body';
		if (clock.voyage) parentId = '.popover';
		for (var label in allLabels.keys) {
			var menuLabel = (label == 'boxes') || (label == 'options') || (label == 'manual');
			var elem = $(parentId + ' #label-'+label);
			if (elem.length) {
				if (menuLabel) {
					elem.html(allLabels[label][allLabels.currentLng] + ' <b class="caret">');
				} else elem.html(allLabels[label][allLabels.currentLng]);
			}
		}
	},

	// ==============================================================================
	// этот метод упаковывает все наборы меток в отдельные пакеты json для сохранения
	// ==============================================================================

	packing: function() {
		// перебираем все имеющиеся языки подсказок и сохраняем:
		for( var lang in allLabels['langs'] ) {
			var pack = {};
			for ( var key in allLabels['keys'] ) {
				pack[key] = allLabels[key][lang];
			}
			// ключ пакета:
			pack['key'] = lang;
			// имя файла:
			pack['file'] = lang + allLabels['post'];
			// тип пакета:
			pack['packType'] = this['packType'];
			uploadPack(pack);
		}
	},

	// ==============================================================================
	// этот метод устанавливает конкретный набор из списка пакетов json
	// ==============================================================================

	install: function(pack) {
		if (!pack) { console.warn('not have pack for install!'); return null;}
		var lang = pack['key'];
		if(!lang) { console.error('pack not have lang key for install!'); return null; }
		allLabels['langs'][lang] = lang + allLabels['post'];
		for( var key in pack ) {
			if ( key in allLabels['keys'] ) {
				if (!allLabels[key]) allLabels[key] = {};
				allLabels[key][lang] = pack[key];
			}
		}
		// пересохраняем пакет в хранилище:
		var jsonKey = allLabels['stor'] + pack['key'];
		storage.save(jsonKey, pack);
		var listKey = allLabels['stor'];
		storage.updateList(listKey, jsonKey);
	},

	// ==============================================================================
	// этот метод обновляет все наборы пакетов json из списка сервера
	// ==============================================================================

	update: packUpdate,

	// ==============================================================================
	// этот метод загружает и устанавливает пакеты этого объекта из хранилища
	// ==============================================================================
	
	load: listLoad
	
};