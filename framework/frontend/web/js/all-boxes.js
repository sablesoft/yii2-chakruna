var allBoxes = {

	// расширение пакетов:
	'post' : '_box.json',
	'stor' : 'box_',
	// тип пакетов (он же имя папки на сервере):
	'packType' : 'boxes',

	// =================================================
	// это кейс со всеми имеющимися языками:
	'langs' : { 
		// ключ - название языка (два латинских символа в нижнем регистре),
		// значение - бокс для этого языка по умолчанию 
	},
	
	// ----------------------------------------------------
	
	// это кейс со всеми имеющимися наборами спиц:
	'boxes' : {
		// ключ - служебное название набора,
		// значение - полное название набора 
	},

	// =========================================================================
	// это кейс с частями json пакета
	// также здесь наглядно видно какой параметр набора к какой части относится:
	// =========================================================================
	
	'parts' : {

		// 1) general pack info:
		// ================================
		
		'lang'	  : 'lang chars',
		'boxName' : 'full box name',
		// этот флаг указывает, использовать ли картинки по умолчанию:
		'defImages': 'boolean',
		// эти флаги указывают, одинаковые ли названия спиц и сил во всех колёсах набора:
		'uniSpokes' : 'boolean',
		'uniPowers' : 'boolean',
		// эти флаги указываются, учитываются ли падежи в этом наборе:
		'caseSpokes': 'boolean',
		'casePowers': 'boolean',
		'caseWheels': 'boolean',
		// эти флаги указывают, учитываются ли роды названий колёс, спиц и сил в этом наборе:
		'sexWheels' : 'boolean',
		'sexSpokes' : 'boolean',
		'sexPowers'	: 'boolean',

		// 2) wheels part:
		// ================================
		
		// именительные названия всех колёс набора во всех родах:
		'wheel-nom' : 'object or null',
		// родительные названия всех колёс набора во всех родах:
		'wheel-gen' : 'object or null',

		// 3) spoke part:
		// ================================
		
		// роды названий спиц (0 - ср, 1 - м, 2 - ж):
		'spoke-sex'		: 'array or null',
		// роды названий спиц для разных колёс (null - не используется):
		'spoke-sex-sun' : 'array or null',
		'spoke-sex-moon' : 'array or null',
		'spoke-sex-earth' : 'array or null',
		
		// именительные названия спиц:
		'spoke-nom'		: 'array of names',
		// именительные названия спиц для разных колёс:
		'spoke-nom-sun' : 'array or names or null',
		'spoke-nom-moon' : 'array or names or null',
		'spoke-nom-earth' : 'array or names or null',
		
		// родительные названия спиц:
		'spoke-gen'		: 'array or names or null',
		// родительные названия спиц для разных колёс: 
		'spoke-gen-sun' : 'array or names or null',
		'spoke-gen-moon' : 'array or names or null',
		'spoke-gen-earth' : 'array or names or null',

		// 4) power part:
		// ================================
		
		// роды названий сил (0 - ср, 1 - м, 2 - ж, null - не используется):
		'power-sex' : 'array or null',
		// роды названий сил для разных колёс (0 - ср, 1 - м, 2 - ж, null - не используется):
		'power-sex-sun' : 'array or null',
		'power-sex-moon' : 'array or null',
		'power-sex-earth' : 'array or null',

		// именительные названия сил:
		'power-nom' : 'array of names',
		 // именительные названия сил для разных колёс:
		'power-nom-sun' : 'array or names or null',
		'power-nom-moon' : 'array or names or null',
		'power-nom-earth' : 'array or names or null',
		
		// родительные названия сил:
		'power-gen' : 'array or names or null',
		 // родительные названия сил для разных колёс: 
		'power-gen-sun' : 'array or names or null',
		'power-gen-moon' : 'array or names or null',
		'power-gen-earth' : 'array or names or null',

		// 5) img part:
		// ================================		
		// адреса и альты всех картинок cпиц (если null - набор картинок по умолчанию) :
		'src'		: null,
		'alt'		: null

	},

	// ------------------------------------------------------------------------

	// язык по умолчанию и текущий:
	'defaultLng' 	: 'en',
	'currentLng'	: null,

	// ==============================================================
	// набор текущий:
	// ==============================================================

	'currentBox' 	: 'defaultEN',
	// (инициируется языком по умолчанию)
	
	// ----------------------------------------------------------------
	
	// набор картинок спиц по умолчанию:
	
	'defaultImg'	: [	"./img/mask/01Dragon.png", "./img/mask/13Stalker.png",
						"./img/mask/05Serpent.png","./img/mask/10Shanti.png",
						"./img/mask/02Wind.png", "./img/mask/14Jaguar.png",
						"./img/mask/06Kali.png", "./img/mask/11Lila.png",
						"./img/mask/03Maya.png", "./img/mask/15Eagle.png",
						"./img/mask/07Hand.png", "./img/mask/12Shaman.png",
						"./img/mask/04Seed.png", "./img/mask/16Hero.png",
						"./img/mask/08Star.png", "./img/mask/09Moon.png",
						"./img/mask/01Dragon.png" ],

	'defaultAlt'	: [ 'dragon', 'stalker', 'serpent', 'shanti', 'wind', 'jaguar', 'kali', 'lila', 'maya', 
						'eagle', 'hand', 'shaman', 'seed', 'hero', 'star', 'moon', 'dragon' ],

	// ----------------------------------------------------------------

	'initiated' : false,

	init: function() {
		if (this.initiated)
			return;

		this.load();
		this.currLang();

		this.initiated = true;
	},

	// этот метод добавляет новые языки к уже существующим в кейсе
	// он принимает название языка и кюч набора
	addLang : function(lang, defBox) {
		if (!lang || !defBox) return null;
		if (!(lang in allBoxes['langs'])) allBoxes['langs'][lang] = defBox;
	},

	// ==============================================================================
	// этот метод устанавливает набор спиц по умолчанию для своего языка:
	// ==============================================================================
	
	defaultBox: function(boxKey) {
		function currDefBox(lang) {
			if (!lang || !(lang in allBoxes['langs'])) lang = allBoxes.currentLng;
			var defBox = {};
			var defBoxKey = allBoxes['langs'][lang];
			defBox['key'] = defBoxKey;
			defBox['name'] = allBoxes[defBoxKey]['boxName'];
			return defBox;
		}
		// проверяем входящие данные:
		// если ключа нет - возвращаем дефаулт бокс для текущего языка:
		if (boxKey == null) return currDefBox();
		var validBox = boxKey in this.boxes;
		if (!validBox) return currDefBox();
		var lang = allBoxes[boxKey]['lang'];
		// если всё нормально - устанавливаем полученный набор:
		allBoxes['langs'][lang] = boxKey;
		return currDefBox(lang);
	},	

	// ==============================================================================
	// этот метод устанавливает текущий набор спиц из имеющихся,
	// если он подходит для текущего языка:
	// ==============================================================================
	
	currBox : function(boxKey) {
		function currBox() {
			var currentBox = {};
			var key = allBoxes.currentBox;
			currentBox['key'] = key;
			currentBox['name'] = allBoxes[key]['boxName'];
			return currentBox;
		}
		// проверяем входящие данные:
		if (boxKey == null) return currBox();
		var validKey = boxKey in this.boxes;
		if (!validKey) return currBox();
		var validLang = this[boxKey]['lang'] == allBoxes.currentLng;
		if (!validLang) {
			console.log('this box not for current languege'); return currBox();
		}
		this.currentBox = boxKey;
		return currBox();
	},

	// ==============================================================================
	// этот метод устанавливает 	текущий язык показа инфо
	// если он имеется в кейсе языков 'langs'
	// ==============================================================================
	
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
		this.currentBox = this['langs'][lang];
		this.currentLng = lang;
		return this.currentLng;
	},
	// вместе с языком меняется набор спиц из списка по умолчанию для данного языка
	
	// ==============================================================================
	// этот метод возвращает данные и по спицам и по силам:
	// ==============================================================================
	
	getData: function(key, num) {
		this.init();
		let haveSex, haveCase, uniData;
		// проверка ключа (номер уже проверили выше):
		let invalidNum = (key !== 'spoke') && (key !== 'power');
		if (invalidNum) return null;
		// получаем ключ активного набора и сохраняем общие сведения о нём:
		let data = {};
		let boxKey = this.currentBox;
		data['boxKey'] = boxKey;
		data['boxName'] = allBoxes[boxKey]['boxName'];
		data['lang'] = allBoxes[boxKey]['lang'];
		// получаем и сохраняем флаги данных:
		uniData  = ( key === 'spoke' ) ? this[ boxKey ][ 'uniSpokes'  ] : this[ boxKey ][ 'uniPowers'  ];
		haveSex  = ( key === 'spoke' ) ? this[ boxKey ][ 'sexSpokes'  ] : this[ boxKey ][ 'sexPowers'  ];
		haveCase = ( key === 'spoke' ) ? this[ boxKey ][ 'caseSpokes' ] : this[ boxKey ][ 'casePowers' ];
		data['have'] = {};
		data['have']['case'] = haveCase;
		data['have']['sex'] = haveSex;
		data['have']['uni'] = uniData;
		// получаем остальные запрашиваемые данные из активного набора:
		if (uniData) {
			data['nom' ] = this[boxKey][key + '-nom'][num];
			if (haveSex) data['sex'] = this[boxKey][key + '-sex'][num];
			if (haveCase) data['gen'] = this[boxKey][key + '-gen'][num];
		// случай когда для разных колёс разные данные:	
		} else { 
			for (var wheel in Wheels) {
				data['nom-' + wheel] = 
					(this[boxKey][key + '-nom-' + wheel])? 
					 this[boxKey][key + '-nom-' + wheel][num] : null;
				if (haveSex) 
					data['sex-' + wheel] = 
						(this[boxKey][key + '-sex-' + wheel]) ? 
						 this[boxKey][key + '-sex-' + wheel][num] : null;
				if (haveCase) 
					data['gen-' + wheel] = 
						(this[boxKey][key + '-gen-' + wheel]) ?
						 this[boxKey][key + '-gen-' + wheel][num] : null;
			}
		}
		var defImages = this[ boxKey ][ 'defImages' ];
		data['src'] = (defImages) ? this['defaultImg'][num] : this['src'][num];
		data['alt'] = (defImages) ? this['defaultAlt'][num] : this['alt'][num];
		return data;
	},

	// ==============================================================================
	// этот метод возвращает информацию по запрашиваемому колесу:
	// ==============================================================================
	
	getWheel: function(wheelKey) {
		// проверка корректности ключа:
		if (!(wheelKey in Wheels)) return null;
		var wheel = {};
		var boxKey = this.currentBox;
		var haveSex = this[boxKey]['sexWheels'];
		var haveCase = this[boxKey]['caseWheels'];
		wheel['sex'] = haveSex;
		wheel['case'] = haveCase;
		wheel['nom'] = this[boxKey]['wheel-nom'][wheelKey];
		if (haveCase) wheel['gen'] = this[boxKey]['wheel-gen'][wheelKey];
		return wheel;
	},

	// ==============================================================================

	// этот метод возвращает список ключей наборов для данного языка:
	getKeys: function(lang) {
		// проверяем входящие данные:
		var validLang = (lang != null) && (lang in this.langs);
		if (!validLang) lang = this.currentLng;
		var keys = {};
		for (box in this.boxes) {
			var validBox = this[box]['lang'] == lang;
			if (validBox) 
				keys[box] = { 
					'name' : this[box]['boxName'], 
					'type' : this['boxes'][box], 
					'lang' : this[box]['lang'] 
				};
		}
		return(keys);
	},

	// ==============================================================================
	// этот метод упаковывает все наборы в отдельные пакеты json для сохранения
	// ==============================================================================

	packing: function() {
		var pack = {};
		// перебираем все имеющиеся наборы и сохраняем:
		for( var box in allBoxes['boxes'] ) {
			pack = this[box];
			// тип пакета:
			pack['packType'] = this['packType'];
			// имя файла:
			pack['file'] = box + allBoxes['post'];
			// ключ пакета:
			pack['key']  = box;
			uploadPack(pack);
		}
	},

	// ==============================================================================
	// этот метод устанавливает конкретный набор из списка пакетов json
	// ==============================================================================

	install: function(pack) {
		if (!pack) { console.warn('not have pack for install!'); return null;}
		var key = pack['key'];
		if(!key) { console.error('pack not have key for install!'); return null; }
		allBoxes[key] = {};
		allBoxes['boxes'][key] = pack['boxName'];
		for( var el in pack ) {
			if ( el in allBoxes['parts'] ) allBoxes[key][el] = pack[el];
		}
		var lang = pack['lang'];
		allBoxes.addLang(lang, key);
		// пересохраняем пакет в хранилище:
		var jsonKey = allBoxes['stor'] + pack['key'];
		storage.save(jsonKey, pack);
		var listKey = allBoxes['stor'];
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