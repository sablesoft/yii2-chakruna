// ===========================================================
// это объект, который хранит и обрабатывает все цитаты
// ===========================================================
						// {
						// 	'source' : '',
						// 	'text'	 : ''
						// }

let allQuotes = {

	// расширение пакетов:
	'post' : '_quotes.json',
	'stor' : 'quotes_',
	// тип пакета:
	'packType' : 'quotes',

	// кейс со всеми наборами цитат:
	// ключ - служебное название набора цитат, 
	// значение - флаг показа!
	'quotes' : {},

	// кейс с языками цитат:
	'langs' : {},
	
	// массив с ключами спиц:
	'spokes' : [ 'dragon', 'stalker', 'serpent', 'shanti', 'wind', 'jaguar', 'kali', 'lila', 'maya', 
						'eagle', 'hand', 'shaman', 'seed', 'hero', 'star', 'moon', 'dragonNew' ],

	// текущий язык:
	'currentLng'   : null,

	// этот метод возвращает случайную цитату из активного цитатника для данной спицы:
	getQuote: function (num) {
		function randomInt(min, max) {
		    var rand = min - 0.5 + Math.random() * (max - min + 1)
		    rand = Math.round(rand);
		    return rand;
		  }
		var spoke = this['spokes'][num];
		// получаем список подходящих активных альбомов:
		var Albums = this.getAlbums(true);
		if(!Albums || !Albums.length) {
			// console.log('not have propers albums now!');
			return null;
		}
		var max = (Albums).length - 1;
		// выбираем один из альбомов:
		var album = Math.abs(randomInt(0, max));
		album = Albums[album]['key'];
		max = (this[album][spoke]).length - 1;
		// выбираем цитату из этого альбома:
		var quote = Math.abs(randomInt(0, max));
		quote = this[album][spoke][quote];
		return quote;
	},

	// этот метод устанавливает данный язык или возвращает текущий
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
		this.currentLng = lang;
		return this.currentLng;
	},

	// этот метод возвращает список альбомов для текущего языка
	// если получен флаг истины - выбирает только альбомы из кейса флагов показа
	// (используется в генерации меню опций и для выбора цитаты)
	
	getAlbums: function(flag) {
		var Albums = [];
		// определяем текущий язык:
		var currLang = this['currentLng'];
		if (currLang == null) return null;
		// перебираем все имеющиеся альбомы цитат:
		for (var album in this['quotes']) {
			var output = {};
			// ищем альбомы для текущего языка:
			var validAlbum = this[album]['lang'] == currLang;
			// а также с флагом показа, если требуется:
			if (flag) validAlbum = validAlbum && (this['quotes'][album]);
			if (validAlbum) {
				output['key'] = album;
				output['name'] = this[album]['title'];
				Albums.push(output);
			}
		}
		return Albums;
	},

	// этот метод переключает показ данного альбома:
	toggle: function(album) {
		this['quotes'][album] = (this['quotes'][album]) ? false : true;
		storage.save(album, this['quotes'][album]);
	},

	// этот метод загружает флаги показа альбомов из хранилища:
	loadFlags: function() {
		for (var album in this['quotes']) {
			this['quotes'][album] = (storage.get(album))? true : false;  
		}
	},

	// ==============================================================================================
	// этот метод добавляет новый язык если требуется, а также ключ цитат в массив ключей этого языка:
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
		if (!(lang in allQuotes['langs']))
			allQuotes['langs'][lang] = new Array();
		// если ключа нет в массиве ключей данного языка - добавляем:
		if (!inArr(allQuotes['langs'][lang], key)) 
			(allQuotes['langs'][lang]).push(key);
	},

	// ==============================================================================
	// этот метод упаковывает все наборы в отдельные пакеты json для сохранения
	// ==============================================================================

	packing: function() {
		var pack = {};
		// перебираем все имеющиеся наборы цитат и сохраняем:
		for( var album in allQuotes['quotes'] ) {
			pack = allQuotes[album];
			pack['key']  = album;
			pack['file'] = album + allQuotes['post'];
			pack['packType'] = this['packType'];
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
		allQuotes[key] = {};
		// подгружаем флаг показа из хранилища:
		allQuotes['quotes'][key] = (storage.get(key))? true : false;
		var lang = pack['lang'];
		allQuotes.addLang(lang, key);
		allQuotes[key]['lang'] = pack['lang'];
		allQuotes[key]['title'] = pack['title'];
		for( var x = 0; x < allQuotes['spokes'].length; x++ ) {
			var spoke = allQuotes['spokes'][x];
			allQuotes[key][spoke] = (pack[spoke]) ? pack[spoke] : null;
		}
		// пересохраняем пакет в хранилище:
		var jsonKey = allQuotes['stor'] + pack['key'];
		storage.save(jsonKey, pack);
		var listKey = allQuotes['stor'];
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