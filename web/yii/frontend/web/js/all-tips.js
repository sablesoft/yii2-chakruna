//////////////////////////////////////////////////////////////////
// этот объект плагина будет содержать все типсы на всех языках //
// а также все необходимые методы для работы с ними             //
//////////////////////////////////////////////////////////////////
var	allTips = {

	// расширение пакетов:
	'post' : '_tips.json',
	'stor' : 'tips_',
	// тип пакетов:
	'packType' : 'tips',

	// ==============================================================
	// это кейс с ключами всех типсов для быстрого доступа к ним:
	// ==============================================================
	
	'keys' : {

		// ----------------------------------------------------------------
		// подсказки на главной странице программы:
		// ----------------------------------------------------------------
	
			// главный заголовок программы:
				'mainTitle'	  : 'main application title',

			// верхнее меню:
				'lang' 		  : 'langueges switch',
				'lang-change' : 'lang change option',
				'editLang'	  : 'edit current lang',
				'addLang'	  : 'open addLang modal',
				'boxes'		  : 'current box switch',
				'editBox'	  : 'edit current box option',
				'addBox'	  : 'append new box option',
				'box-default' : 'default box option',
				'box-custom'  : 'custom box option',
				'options' 	  : 'appliaction options',
				'anima' 	  : 'animation toggle',
				'tips' 		  : 'tooltips toggle',
				'quotes'	  : 'quotes toggles',
				'manual' 	  : 'manuals change',
				'tour'		  : 'educational tour',
				'editTour'	  : 'edit tours',
				'addTour'	  : 'add new tour',
				'btn-menu'	  : 'open menu button',

			// кнопки в центрах колёс и переключатели колёс:
				'btn-now'	  : 'present time spooling',
				'btn-show'	  : 'custom time spooling',
				'btn-save'	  : 'save location',
				'btn-up' 	  : 'wheels spooler up',
				'btn-down' 	  : 'wheels spooler down',

			// элементы формы внизу:
				'date'		  : 'date label and input',
				'time'		  : 'time label and input',
				'localList'	  : 'local label and select',
				'gps'		  : 'gps label',
				'lat'		  : 'latitude input',
				'lng'		  : 'longitude input',

			// спицы на колёсах:
				'sun-spoke'   : 'spoke of sun wheel',
				'moon-spoke'  : 'spoke of moon wheel',
				'earth-spoke' : 'spoke of earth wheel',

			// четверти колёс:
				'spring'	  : 'right sun quarter',
			'spring-summer'   : 'time between',
				'summer'	  : 'top sun quarter',
			'summer-autumn'   : 'time between',
				'autumn'	  : 'left sun quarter',
			'autumn-winter'   : 'time between',
				'winter'	  : 'bottom sun quarter',
			'winter-spring'   : 'time between',
				'growing'	  : 'right moon quarter',
			'growing-full'    : 'time between',
				'full'	  	  : 'top moon quarter',
				'full-waning' : 'time between',
				'waning'	  : 'left moon quarter',
				'waning-new'  : 'time between',
				'new' 		  : 'bottom moon quarter',
				'new-growing' : 'time between',
				'morning'	  : 'right earth quarter',
				'morning-day' : 'time between',
				'day'	  	  : 'top earth quarter',
				'day-evening' : 'time between',
				'evening'	  : 'left earth quarter',
			 'evening-night'  : 'time between',
				'night' 	  : 'bottom earth quarter',
			 'night-morning'  : 'time between',

			// активная точка:
				'staffsun'	  : 'show moment in sun wheel',
				'staffmoon'	  : 'show moment in moon wheel',
				'staffearth'  : 'show moment in earth wheel',

			// кнопки домов:
				'earth-next'  : 'earth next spooler',
				'earth-lair'  : 'earth lair button',
				'earth-prev'  : 'earth prev spooler',
				'moon-next'  : 'moon next spooler',
				'moon-lair'  : 'moon lair button',
				'moon-prev'  : 'moon prev spooler',
				'sun-next'  : 'sun next spooler',
				'sun-lair'  : 'sun lair button',
				'sun-prev'  : 'sun prev spooler',

		// ----------------------------------------------------------------
		// подсказки модального окна информации:
		// ----------------------------------------------------------------
		
				// заголовок спицы (название дома):
				'lairTitle' : 'spoke modal window title',
				'spokeImg'	: 'current spoke image',
				'lairQuote'	: 'tematic quote about spoke power',
				'lairPike' 	: 'pike of showing lair',
				'sunTime'	: 'solar-year time',
				'moonTime'	: 'moon phase time',
				'earthTime' : 'solar day time',
				'localInfo' : 'current location info',
				'latInfo'	: 'current geographic latitude',
				'lngInfo'	: 'current geographic longitude',

				// заголовок второй вкладки:
				'orbitalCulture' : 'unity orbital culture info',
				'lairDesc'		 : 'general lair description',
				'holidays'		 : 'holidays and ceremonies of current lair',
				'festivals'	 	 : 'world festivals of current lair',

				// заголовок третьей вкладки:
				'ezoWorld'		: 'ezoteric info about current lair',
				'spokeDesc'		: 'info of current spoke world direction',
				'spokeElement'	: 'nature element(s) of current lair',
				'spokePower'	: 'shamanic power of current lair'
			},
	// (нет ключа в кейсе - нет типса)
	
	// ======================================================================================
	// это перечень всех типсов, имена которых - ключи из кейса
	// всего их может быть ограниченное конкретное количество,
	// потому что каждый типс будет жёстко прописан в index.html в титле элементов с классом "tip"
	// ======================================================================================

	// ================================================================
	// это кейс со всеми возможными составными частями каждого типса:
	// ================================================================
	'parts' : {
				'title' 	: 'tip-title',
				'content'	: 'tip-content',
				'note'		: 'tip-note'
			},
	// (кстати, значения этих ключей - соответствующие классы css)
	
	// ----------------------------------------------------------------
	
	// это кейс со всеми имеющимися языками
	'langs' : { 
				// английский - язык по умолчанию 
				'en' : 'default', // пока выключил этот язык вообще)
				// русский - встроенный
				'ru' : 'embedded'
			},
	// (дополняется новыми языками при вызове метода addLang(lang, tipsTranslate) )
	
	// ----------------------------------------------------------------

	// язык подсказок по умолчанию:
	'defaultLng' 	: 'ru',

	// ----------------------------------------------------------------

	// текущий язык показа подсказок:
	'currentLng'	: null,
	// (инициируется языком по умолчанию)
	
	// ----------------------------------------------------------------
	
	// этот флаг определяет строгость валидации типсов
	// если true - все части типса должны обязательно присутствовать
	// иначе типс бракуется
	'strictTips'	: false,
	// (по умолчанию стоит мягкий режим)

	// ----------------------------------------------------------------
	
	// флаг показа подсказок:
	'showFlag' 		: true,

	'initiated' : false,

	// ----------------------------------------------------------------

	// этот метод добавляет новые языки к уже существующим в кейсе типсам
	// он принимает название языка и объект с переводами типсов
	addLang : function(lang, tipsTranslate) {
		if (!lang || !tipsTranslate) {
			console.log("languege name & tips translate is requared!");
			return null;
		}
		if (lang.length > 2) {
			console.log('please, use two standart symbols for your languege name!');
			return null;
		}
		var newLang = !(lang in this.langs);
		if (newLang) {
			this.langs[lang] = 'custom'; 
		}
		for (var tip in tipsTranslate) {
			var badTip = !(tip in this.keys);
			if (badTip) {
				// console.log('invalid tip key:', tip);
				continue;
			}
			// заводим временный перевод и кэшируем новый перевод:
			var tempTranslate = {};
			var translate = tipsTranslate[tip];

			for (var el in this.parts) {
				if (badTip) continue;
				havePart = el in translate;
				if (!havePart) {
					// console.log('your translate tip', tip,'not have', el);
					tempTranslate[el] = null;
					if (this.strictTips) {
						badTip = true;
						tempTranslate = null;
						// console.log('bad tip!');
					}
					continue;
				}
				tempTranslate[el] = translate[el];
			}
			// вносим новый перевод типса в структуру типсов:
			this[tip][lang] = tempTranslate;
		}
	},

	// ----------------------------------------------------------------

	// этот метод устанавливает текущий язык показа типсов
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
	// если такого языка нет - язык устанавливается на null
	// флаг анимации сбрасывается

	// ----------------------------------------------------------------

	// этот метод принимает ключ и после всех проверок выдаёт по нему нужный типс 
	getTip: function(key) {
		let validKey = key in this.keys;
		if (!validKey) {
			console.log('invalid key:', key);
			return null;
		}
		if (!this[key]) return null;
		var tip = this[key][this.currentLng];
		if (!tip) {
			return null;
		}
		tip['key'] = key;
		tip['lang'] = this.currentLng;
		return tip;
	},
	// если такого типса нет - возвращается null
	
	// ----------------------------------------------------------------
	
	// этот метод возвращает готовый html текст типса
	// который собирает по шаблону из скрипта #tipTemplate
	getHTML: function(key) {
		let tip = this.getTip(key);
		if (!tip) return null;
		return xhatClient.getHTML('tip', tip);
	},
	// (для работы требует подключение скриптов handlebars.js и xht-client.js)

	// -----------------------------------------------------------------------
	
	// инициация показа подсказок:
	init : function() {

		if (this.initiated) return;

        this.currLang();
        this.load();

        // обертка для шаблонов подсказок:
		let tipi = jQuery('#tipi');
		if (tipi.length) {
			tipi.children().remove();
		} else {
			tipi = $('<div></div>').attr('id', 'tipi');
			$('body').append(tipi);
		}

        jQuery('.tip').tooltipster({
            animation: 'fade',
            delay: 200,
            theme: 'tooltipster-punk',
            trigger: 'hover',
            contentAsHTML: true,
            functionBefore: function(instance, helper) {
                // проверяем опцию показа подсказок:
                if (!allTips.showFlag) {
                    return false;
                }
            	let el = jQuery(helper.origin);
                // кэшируем его титл:
                let tipKey = el.data('tip');
                // получаем и проверяем html текст типса:
                let tip = $(allTips.getHTML(tipKey));
                if (!tip.length) return false;
                if (el.hasClass('tipSpoke')) {
                    let wheel = el[0]['wheel'];
                    let num = el[0]['N'];
                    tip.find('.tip-title').html(board.getHouse(wheel, num));
                    let pike = moment(staff.wheels[wheel][num]);
                    let gps = staff['gps']['local'];
                    let pikeString = pike.format('DD.MM.YYYY (HH:mm)') + ' - ' + gps;
                    let pikeInfo = $('<p style="text-align : center"></p>')
                        .html(pikeString);
                    tip.find('p').first().prepend(pikeInfo);
                }
                tipi.find('#tip').remove();
                tipi.prepend(tip);

                return true;
			}
        });
		this.initiated = true;
	},

	// -------------------------------------------------------------------
	
	// переключатель показа (сохраняем в хранилище!)
	toggle: function() { 
		this.showFlag =  (this.showFlag) ? false : true;
		storage.save('flagTips', this.showFlag); 
	},

	// загружаем флаг из хранилища и показываем
	flag: function() {
		this.showFlag = storage.get('flagTips');
		return this.showFlag;
	},

	// ==============================================================================
	// этот метод упаковывает все наборы подсказок в отдельные пакеты json для сохранения
	// ==============================================================================

	packing: function() {
		// перебираем все имеющиеся языки подсказок и отправляем на сервер:
		for( var lang in allTips['langs'] ) {
			var pack = {};
			for ( var key in allTips['keys'] ) {
				pack[key] = allTips[key][lang];
			}
			pack['key'] = lang;
			pack['file'] = lang + allTips['post'];
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
		allTips['langs'][lang] = lang + allTips['post'];
		for( var key in pack ) {
			if ( key in allTips['keys'] ) {
				if (!allTips[key]) allTips[key] = {};
				allTips[key][lang] = pack[key];
			}
		}
		// пересохраняем пакет в хранилище если необходимо:
		var jsonKey = allTips['stor'] + pack['key'];
		storage.save(jsonKey, pack);
		var listKey = allTips['stor'];
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