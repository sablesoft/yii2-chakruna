// =============================================================================
// xHat - это клиент для работы с шаблонизатором Handlebars.js
// для работы также нужна библиотека jQuery
// -----------------------------------------------------------------------------
// xHat-клиент умеет:
// - создавать готовый html из заданной структуры данных и конкретного шаблона
// - хранить шаблоны в оперативном кэше а также в локальном хранилище
// - загружать шаблоны типа 'text/x-handlebars-template' из файлов *.xht
// - отправлять шаблоны для сохранения на удалённый сервер (ДОПИСАТЬ!)
// =============================================================================

function xHat(options) {

	// локальная функция создания объекта запроса:
	function getXmlHttpRequest() {
		if (window.XMLHttpRequest) {
			try {
				return new XMLHttpRequest();
			} catch (e) {}
		} else if (window.ActiveXObject) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {}
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {}
		}
		return null;
	}

	// объект со всеми параметрами клиента и значениями по умолчанию:
	let xhtParams = {

		// флаг работы с хранилищем:
		'storage' 	: true,

		// флаг работы с сервером:
		'server'  	: true,

		// путь к папке xhat:
		'path'		: '/xhat',

		// флаг работы со скриптами документа:
		'scripts' 	: true,

		// флаг перезаписи шаблонов в кэше и хранилище:
		'rewrite' 	: true,

		// префикс xht шаблонов в хранилище:
		'storPref'	: 'xHat_',

		// id префикс xht скриптов шаблонов:
		'scriptPref': 'xhat-',

		// расширение файлов шаблонов:
		'filePost'	: '_xht.json',

		// оперативный кэш удалённых серверов
		// в нём сохраняем адреса pull/push сервисов:
		'urls'		: { 'pull' : '/pull', 'push' : '/push'},

		// оперативный кэш хранения шаблонов
		// в нём сохраняем ключи шаблонов без расширений и префиксов
		// и сам скрипт шаблона в строковом формате:
		'operCash'	: {}
	};

	// этот метод устанавливает параметры клиента:
	this.setParams = function(parObj) {
		// если параметров нет - устанавливаем по умолчанию:
		if (!parObj) {
			for (let param in xhtParams) this[param] = xhtParams[param];
			return xhtParams;
		}
		// проверяем каждый параметр и устанавливаем:
		for (let param in parObj)
			if (param in xhtParams) this[param] = parObj[param];
		return true;
	};

	// этот метод сразу добавляет полученный dom к указанному узлу
	this.appendHTML = function(xhtKey, xhtData, nodeSelector) {
		if (!nodeSelector) return null;
		var html = this.getHTML(xhtKey, xhtData);
		if (!html) return null;
	    var $node = $(nodeSelector);
	    if ($node.length !== 1) return null;
		$html = $(html);
	    $node.append($html);
		return $html;
	};

	// этот метод возвращает 'text/html'
	this.getHTML = function(xhtKey, xhtData) {
		// console.info('xht getHTML');
		if (!xhtKey) return null;
		if (!xhtData) xhtData = null;
		var template = this.get(xhtKey);
		if (!template) return null;
		var xhtConstructor = Handlebars.compile(template);
		if (!xhtConstructor) return null;
		var html = xhtConstructor(xhtData);
		return html;
	};

	// этот метод ищет текст шаблона по ключу в следующем порядке:
	// 1) в кэше, 2) в хранилище, 3) в скриптах документа 4) на сервере
	// возвращает текст шаблона только после того как закэшировал
	this.get = function( xhtKey ) {
		// 1: ищем в оперативном кэше
		let xhtStr = this['operCash'][xhtKey];
		if (this.cash(xhtKey, xhtStr)) return xhtStr;
		// 2: ищем в локальном хранилище
		if (this['storage']) {
			let storKey = this['storPref'] + xhtKey;
			xhtStr = JSON.parse(localStorage.getItem(storKey));
			if (this.cash(xhtKey, xhtStr)) return xhtStr;
		}
		// 3: ищем в скриптах документа
		if (this['scripts']) {
			let xhtId = '#' + this['scriptPref'] + xhtKey;
			let $xhtScript = $(xhtId);
			if ($xhtScript.length)
				xhtStr = $xhtScript.html().trim();
			if (this.cash(xhtKey, xhtStr)) return xhtStr;		
		}
		// 4: ищем на удалённом сервере
		if( this['server'] ) {
			let self = this;
			let lang = jQuery('body').data('lang');
			// console.info('xht pull service start!');
			let pullUrl = lang + this['path'] + this['urls']['pull'];
			jQuery.ajax({
                type: 'get',
				data: {'key' : xhtKey},
                url: pullUrl,
                success: function(res) {
                	console.log(res);
                    self.cash(xhtKey, res);
                },
				error: function(res) {
                    console.error(res);
				}
            });

		}
		// нигде не нашли:
		return null;
	};

	// этот метод кэширует шаблон и сохраняет в хранилище:
	this.cash = function(xhtKey, xhtStr) {
		// если пустой ключ или строка - выходим:
		if (!xhtKey || !xhtStr) return false;
		// если шаблон уже в кэше и перезапись выключена - выходим:
		if (this['operCash'][xhtKey] && !this['rewrite']) return true;
		// сохраняем в кэш:
		this['operCash'][xhtKey] = xhtStr;
		// сохраняем в хранилище, если включено:
		if (this['storage']) {
			var listKey = this['storPref'];
			var itemKey = listKey + xhtKey;
			var list = JSON.parse(localStorage.getItem(listKey));
			if (!list) list = new Array();
			// проверяем наличие ключа шаблона в списке хранилища:
			var isNew = true;
			for (var x = 0; x < list.length; x++)
				if (xhtKey == list[x]) isNew = false;
			// если ключ новый - заносим его в список:
			if (isNew) {
				list.push(xhtKey);
				localStorage[listKey] = JSON.stringify(list);
			}
			// сохраняем/перезаписываем шаблон:
			localStorage[itemKey] = JSON.stringify(xhtStr);
		}
		return true;
	};

	// этот метод отправляет готовый json пакет на push-сервeр:
	this.pushPack = function(xhtKey) {
		var useServer = this['server'];
		// если сервер отключен - выходим:
		if (!useServer) return null;
		var pushUrl = this['path'] + this['urls']['push'];
		// ищем текст шаблона:
		var xhtStr = this.get(xhtKey);
		if (!xhtStr) return null;
		// готовим пакет к отправке:
		var xhtPack = {};
		xhtPack['key'] = xhtKey;
		xhtPack['content'] = xhtStr;
		var jsonPack = JSON.stringify(xhtPack);
		// cоздаём объект запроса и отрпавляем пакет:
		var req = getXmlHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState !== 4) return;
			// если сервер прислал ответ - выводим предупреждением:
			if (req.responseText)
				console.warn(req.responseText);
		};
		req.open("POST", pushUrl, true);
		req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		req.send(jsonPack);
	};

	// этот метод ищет и пакует все найденные шаблоны 
	// в пакеты json и отправляет на сервер
	this.upload = function() {
		var useServer = this['server'];
		// если сервер отключен - выходим:
		if (!useServer) return null;
		var xhtKey, itemKey;
		// если хранилище включено - подкачиваем все пакеты из него в кэш:
		if (this['storage']) {
			var listKey = this['storPref'];
			var list = JSON.parse(localStorage.getItem(listKey));
			for (var x = 0; x < list.length; x++) {
				xhtKey = list[x];
				itemKey = listKey + xhtKey;
				this['operCash'][xhtKey] = JSON.parse(localStorage.getItem(itemKey));
			}
		}
		// cоздаём пакеты шаблонов и отправляем на сервер:
		for (xhtKey in this['operCash']) this.pushPack(xhtKey);
	};

	// установка опций по умолчанию:
	this.setParams();
	// изменение параметров клиента из опций конструктора:
	this.setParams(options);
}