let ANGS = [ 0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360 ];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL OBJECT "WHEELS":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let Wheels = { 'earth' : '', 'moon' :  '', 'sun' :  '' };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL OBJECT "STORAGE":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// keys(inputKeys); --> {if 'inputKeys' send - set KEYS; return KEYS}
// get(key, dataNum); --> {return 'key data' of dataNum}
// count(key); --> {return count of 'key data'}
// currLang(num/chars); --> {if 'num' or 'chars' - set this lang as current; return current num of lang}
// current(key, num); --> {if 'num' send - set current num of 'key data'; return current num of 'key data'}
// number(key, data); --> {return num of 'key data'}
// save(key, data);
// edit(key, data, dataNum);
// delete(key, dataNum);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// при создании объекта класса Storage запускается его метод "create"
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Storage() {
	
	// INNER FUNCTIONS:
	function loadError(key, func) {
		console.error("LOAD ERROR IN", func, ":", key, "is not exist in your local storage!");
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function saveError(key, func) {
		console.error("SAVE ERROR IN", func, ":", key, "is not sent for save!");
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function getError(key, func) {
		console.error("GET ERROR IN", func, ": correct", key, "is required!");
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function loadData(key) {
		let data;
		data = JSON.parse(localStorage.getItem(key));
		return data;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	function deleteData(key) {
		let data;
		data = loadData(key);
		localStorage.removeItem(key);
		return data;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function saveData(key, data) {
		return localStorage[key] = JSON.stringify(data);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function saveCountData(key, data) {
			let keyCount = key + KEYS.count;
			let dataCount = loadData(keyCount);
			if (dataCount === null) { dataCount = 0; };
			let dataKey = key + dataCount;
			saveData(dataKey, data);
			saveData(keyCount, ++dataCount);
			return (--dataCount);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// INNER CONSTANT:
	let KEYS = 	{
					exist: 	'shamStorage',
					update: 'shamUpdate',
					count: 	'Count', 
					gps : 	'gps',
					curr : 	'Curr',
					lang: 	'lang',
					langs: 'langs',
					flags: { 'anima' : 'flagAnim', 'tips' : 'flagTips' }
				};

	let GPS = 	[
					{'local' : 'Greenwich Time',         'lat' :  51.4772220, 'lng' :         0.0},
					{'local' : 'Amsterdam, Netherlands', 'lat' :  52.3740300, 'lng' :   4.8896900},
					{'local' : 'Florida, USA',           'lat' :  41.3317600, 'lng' : -74.3568200},
					{'local' : 'Gomel, Belarus',         'lat' :  52.4345000, 'lng' :  30.9754000},
					{'local' : 'Habarovsk, Russia',      'lat' :  48.4827200, 'lng' : 135.0837900},
					{'local' : 'Kiev, Ukraina',          'lat' :  50.4546600, 'lng' :  30.5238000},
					{'local' : 'Minsk, Belarus',         'lat' :  53.9000000, 'lng' :  27.5666700},
					{'local' : 'Moskow, Russia',         'lat' :  55.7522200, 'lng' :  37.6155600},
					{'local' : 'New York, USA',          'lat' :  40.7142700, 'lng' : -74.0059700},
					{'local' : 'Sydney, Australia',      'lat' : -33.8678500, 'lng' : 151.2073200},
					{'local' : 'St. Petersburg, Russia', 'lat' :  59.9386300, 'lng' :  30.3141300},
					{'local' : 'Tchaikovsky, Russia',    'lat' :  56.7686400, 'lng' :  54.1148400},
					{'local' : 'Ufa, Russia',            'lat' :  54.7430600, 'lng' :  55.9677900},
					{'local' : 'Volgograd, Russia',      'lat' :  48.7193900, 'lng' :  44.5018400}
				];


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// OUTER PROPERTIES:
	
	this.langs = ['en', 'ru'];

	this.colors = 	{
						'red'	: 	'red',
						'white'	: 	'white',
						'blue'	: 	'blue',
						'yellow': 	'yellow',
						'green'	: 	'green' 
					};

	// OUTER METHODS:
	this.create = function() {
		
		let update = loadData(KEYS.update);

		if (update == null) {
			// строим новое клиентское хранилище:
			console.info('new storage!');
			for (let i = 0; i < GPS.length; i++) {
				this.save(KEYS.gps, GPS[i]);
			}
			this.current(KEYS.gps, 0);
			saveData(KEYS['flags']['anima'], 'true');
			saveData(KEYS['flags']['tips'], 'true');
			saveData(KEYS.langs, this.langs);
			this.currLang(0);
			let update = 0;
			saveData(KEYS.update, update);
		}
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.currGPS = function(gpsNum) {
		if ((gpsNum != null) && (gpsNum < this.count(KEYS.gps))) this.current(KEYS.gps, gpsNum);
		return this.current(KEYS.gps); 
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.currLang = function(num) {
		if (num != null) {
			let validNum = (num >= 0) && (num < this.count(KEYS.langs));
			if (validNum) { this.current(KEYS.lang, num); }
			else {
				let langs = this.get(KEYS.langs);
				validNum = false;
				for (let x = 0; x < langs.length; x++)
					if (num === langs[x]) validNum = x;
				if (validNum !== false) {
					this.current(KEYS.lang, validNum);
				}
			}
		}
		return this.current(KEYS.lang);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.keys = function (inputKeys) {
		for (let key in inputKeys) {
			KEYS[key] = inputKeys[key];
		}
		return KEYS;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.save = function (key, data) {
		if ((data == null) || (!key)) {
			console.getError('key and data', 'save');
			return null;
		}
		if ((key == KEYS.gps) || (key == KEYS.lang)) {
			return saveCountData(key, data);
		}
		return saveData(key, data);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.edit = function (key, data, dataNum, setNum) {
		if ((!data) || (!key)) {
			console.getError('key and data', 'edit');
			return null;
		}
		if (key != KEYS.gps) {
			console.getError('key', 'edit');
			return null;
		}
		if (dataNum == null) {
			dataNum = this.current(key);
			if (dataNum == null) {
				console.loadError(key + KEYS.curr, 'edit');
				return null;
			}
		}
		if (dataNum > this.count(KEYS.gps) - 1) {
			console.getError('data number', 'edit');
			return null;
		}
		let oldData = loadData(key + dataNum);
		for (prop in data) {
			oldData[prop] = data[prop];
		};
		saveData(key + dataNum, oldData);
		return true;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	this.delete = function (key, dataNum, setNum) {
		if ((!key)||(!dataNum)) {
			console.getError('key and dataNum', 'delete');
			return null;
		};
		if (key != KEYS.gps) {
			console.getError('key', 'delete');
			return null;
		};
		let del = loadData(key + dataNum);
		for (let i = dataNum; i < this.count(key); i++ ) {
			let data = loadData(key + i + 1);
			if (data) {
				saveData(key + i, data);
			} else deleteData(key + i);
		};
		saveData(key + KEYS.count, this.count(key) - 1);
		return del;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.count = function(key) {
		if (!key) return null;
		if (key == KEYS.langs) {
			let langs = loadData(KEYS.langs);
			return langs.length;
		}
		let cnt = loadData(key + KEYS.count);
		if (cnt == null) console.loadError(key, 'count');
		return cnt;
	};
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.current = function(key, num) {
		let keyCurr;
		if (!key) return null;
		if ((key == KEYS.gps) || (key == KEYS.lang)) {
			keyCurr = key + KEYS.curr;
		} else return null;
		if (num != null) {
		    if( !parseInt(num) && (key == KEYS.lang) ) {
		        let langs = loadData(KEYS.langs);
		        num = langs.indexOf(num);
		        if( num === -1 ) {
                    console.saveError(key, num);
                    return null;
                }
            }
			saveData(keyCurr, num);
		} else {
			num = loadData(keyCurr);
			if (num == null) {
				console.loadError(keyCurr, 'current');
				return null;
			}
		}
		return num;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.number = function(key, data, flag) {
		if ((!key) || (!data)) return null;
		if ((key != KEYS.gps) && (key != KEYS.lang)) return null;
		let keyData, checkData, count;
		count = loadData(key + KEYS.count);
		for (let i = 0; i < count; i++) {
			checkData = loadData(key + i);
			if (!checkData) { console.loadError(key + i, 'number'); return null; };
			if (checkData == data) return i;
			if ((key == KEYS.gps) && (flag == 1)) {
				if ((checkData.local == data) || (checkData.local == data.local)) return i;
			}
			if ((key == KEYS.gps) && (flag == 2)) {
				if ((checkData.lng == data.lng) && (checkData.lat == data.lat)) return i;
			}
		}
		return null;
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	this.get = function(key, dataNum) {
		if (!key) { console.getError(key, 'get'); return null; }
		let data;
		if (key == KEYS.lang) {
			let langs = loadData(KEYS.langs);
			let num = this.currLang();
			let validNum = (dataNum != null) && (dataNum >= 0) && (dataNum < this.count('langs'));
			if (validNum) num = dataNum;
			return langs[num];
		}
		if (dataNum == null) {
			dataNum = loadData(key + KEYS.curr);
			if (dataNum == null) {
				data = loadData(key);
				if (data == null) {
					return null;
				}
				return data;
			}
		}
		data = loadData(key + dataNum);
		if (!data) return null;
		return data;
	};

	// этот метод добавляет пакет в список пакетов:
	this.updateList = function(listName, packName) {
		if (!listName || !packName) return null;
		let list = loadData(listName);
		if (!list) list = new Array();
		for (let x = 0; x < list.length; x ++) {
			if (packName == list[x]) return x;
		}
		list.push(packName);
		saveData(listName, list);
		return (list.length - 1);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// NEW STORAGE AUTO CREATE:
	console.saveError = saveError;
	console.loadError = loadError;
	console.getError = getError;
	
	this.create();
} 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// END OF "STORAGE" OBJECT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Класс архива:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Archive() {
	let Sticks = [];
	let logs = [];
	this.min = 10;
	this.max = 20;

	this.saveStaff = function(info) {
		let stick = new Stick(staff);
		let num = Sticks.length;
		if ((clock.run) && (num > 1)) num--;
		if (num === this.max) {
			this.reload();
			num = this.min;
		}
		Sticks[num] = stick;
		logs[num] = info;
	};

	this.getStaff = function() {
		num = Sticks.length - 1;
		return Sticks[num];
	};

	this.getOldStaff = function(num) {
		if (num == null) {
			if (Sticks.length < 2) { 
				num = Sticks.length - 1;
			} else {
				num = Sticks.length - 2;
			}
		}
		return Sticks[num];		
	};

	this.reload = function() {
		// console.log("ARCHIVE RELOAD!");
		// console.log("OLD STIKS:", Sticks, Sticks.length);
		let Stek = [];
		for (let x = this.min; x < this.max; x++) {
			Stek[x - this.min] = Sticks[x];
		}
		Sticks = [];
		for (let x = 0; x < Stek.length; x++) {
			Sticks[x] = Stek[x];
		}
		// console.log("NEW STIKS:", Sticks, Sticks.length);
	};

	this.show = function (options) {
		let info;
		console.log("~~~ ARCHIVE INFO ~~~");
		if (options == null) {
			console.log(Sticks);
			// console.log(logs);
			return Sticks.length;
		} else {
			if (options.num) {
				if (options.prop) {
					info = Sticks[options.num][options.prop];
				} else {
					info = Sticks[options.num];
				}
				console.log(options.num, ':', info);
				console.log("LOG:", logs[options.num]);
				return true;
			} else {
				if (options.prop) {
					for (let x = 0; x < Sticks.length; x++) {
						info = Sticks[x][options.prop];
						console.log(x, ':', info);
						console.log("LOG:", logs[x]);
					}
					return true;
				} else {
					console.log("invalid options!"); return null;
				}
			}
		}
		return true;
	};
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// тестирую работу с файлами на сервере:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// эта функция отправляет пакет в формате json на сервер:
function uploadPack( pack ) {
	url = "ajax/upload";
	let jsonPack = JSON.stringify(pack);
	jQuery.ajax({
        url : url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
	    data : jsonPack,
        success: function( res, status  ) {
            console.info( res, status );
        },
        error : function( res, status, e ) {
            console.error( res, status, e  );
        }
    });
}

// эта функция получает массив пакетов из указанного файла,
// а затем вызывает функцию обратного вызова, которой передаёт его:

function updateService(obj) {
    if (!obj || !obj['packType']) {
        console.warn('bad request data!');
        return null;
    }
    // тип запрашиваемых пакетов:
    let packType = obj['packType'];
    // адрес сервиса:
    let updateServiceUrl = "/trans/" + packType + "/all.json";
    jQuery.getJSON(updateServiceUrl, function( res ) {
        packFlag = true;
        obj['update']( res, packFlag );
    })
}

// обновление всех локальных объектов с сервера:
function allPacksUpdate() {
	allBoxes.update();
    allLabels.update();
    allQuotes.update();
    allTours.update();
    allTips.update();
}

// общие методы для all-объектов:
// ------------------------------------------ 

// обновление с сервера:
function packUpdate(packArr, packFlag) {
	if(!packArr) {
        updateService(this);
		return;
	}
	if (packFlag) {
		for (let x = 0; x < packArr.length; x++ ) {
			if (!packArr[x]) continue;
			try {
				this.install(packArr[x]);
			} catch(e) {
				console.warn(packArr[x]);
				console.error(e);
			}
		}
	}
	clock.updateCheck();
}

// загрузка и установка пакетов из хранилища:
function listLoad() {
	let listName = this['stor'];
	let list = storage.get(listName);
	if(!list) return false;
	for (let x = 0; x < list.length; x++) {
		let packName = list[x];
		let pack = storage.get(packName);
		if(!pack) continue;
		this.install(pack);
	}
	return true;
}

// загрузка пакетов из локального хранилища:
function transLoad() {
	return allBoxes.load();
}
