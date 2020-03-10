// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GLOBAL OBJECT "GATE":
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// getWheels(stick);
// getLairs(stick);
// getAngles(stick);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// при создании нового объекта класса Gate ничего не инициируется.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Gate (options) { // options = {...}

	// OUTER METHODS:

	this.getWheels = function (stick) {

		// CHECK STICK:
		if (!checkStick(stick, true)) return null;

		var wheels = {};
		for (wheel in Wheels) {
			wheels[wheel] = getWheel(stick.pike, stick.gps, wheel);
		};
		return (wheels);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// этот метод возвращает номер четверти для данной спицы:
	this.getQuarter = function (num) {
		var spokeQuarters = [0, 0, 1, 2, 2, 2, 3, 4, 4, 4, 5, 6, 6, 6, 7, 0, 0];
		var invalidNum = (num == null) || (num < 0) || (num > 16);
		if (invalidNum) return null;
		return spokeQuarters[num];
	};
	// 0 - первая четверть, 2 - вторая, 4 - третья, 6 - четвёртая
	// 1, 3, 5, 7 - для спиц по серединке между четвертями

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	this.getLairs = function (stick) {

		// CHECK STICK:
		if (!checkStick(stick)) return null;

		var Spike, wheels = {},
			lairs = {};
		Spike = stick.pike;
		wheels = checkWheels(stick);

		for (wheel in Wheels) {
			var minDur = Math.abs(Spike.diff(wheels[wheel][0])); var Num = 0;
			wheels[wheel].forEach(function(Spoke, j) {
				var Dur = Math.abs(Spike.diff(Spoke));
				if (Dur < minDur) {minDur = Dur; Num = j};
			});
			lairs[wheel] = Num;
		};

		return (lairs);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	this.getAngles = function (stick) {

		// CHECK STICK:
 		if (!checkStick(stick)) return null;

		function trackScope (spokeA, spokeB) { return (parseInt(Math.abs(spokeA.diff(spokeB))/2)); }

  		var lairScope, lairAngle  = 11.25;
 		var Spike = stick.pike,
 			wheels = checkWheels(stick),
 			lairs = checkLairs(stick),
 			Angles = {}; // result - three angles of three lairs

  		for (wheel in Wheels) {
  			var lair = lairs[wheel];
			if (Spike.isBefore(wheels[wheel][lair])) {
				lairScope = trackScope(wheels[wheel][lair-1], wheels[wheel][lair]);
			} else if (Spike.isAfter(wheels[wheel][lair])) {
				lairScope = trackScope(wheels[wheel][lair], wheels[wheel][lair+1]);
			} else if (Spike.isSame(wheels[wheel][lair])) {
				lairScope = trackScope(wheels[wheel][lair], wheels[wheel][lair+1]);
			} else {
				console.log('UNKNOWN ERRROR!');
				return null;
			};
			var spikeDur   = Spike.diff(wheels[wheel][lair]);
			var spikeAngle = lairAngle*spikeDur/lairScope;
			var ripeAngle  = ANGS[lair] + spikeAngle;
			Angles[wheel] = ripeAngle;
	    };
		return (Angles);
	};

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// INNER FUNCTIONS:
	
	function checkStick (stick, gps) {
		if (!stick) {
			console.log("STICK ERROR: Stick is required!");
			return false;
		};
		if (!stick.pike) {
			console.log("STICK ERROR: pike is required!");
			return false;
		};

		if (gps) {
			if (!stick.gps) {
				console.log("STICK ERROR: gps is required!");
				return false;
			};
		};
		return true;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function checkWheels (stick) {
		if (!checkStick(stick)) return false;
		if (!stick.wheels) {
			return (this.getWheels(stick));
		} else {
			return (stick.wheels);
		};		
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function checkLairs (stick) {
		if (!checkStick(stick)) return false;
		if (!stick.lairs) {
			return (this.getLairs(stick));
		} else {
			return (stick.lairs);
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	function getWheel(Spike, GPS, wheel) {
		switch (wheel) {
			case 'sun': 	return getSunWheel(Spike);
			case 'moon': 	return getMoonWheel(Spike);
			case 'earth': 	return getEarthWheel(Spike, GPS.lat, GPS.lng);
		};
		console.log('error: invalid wheel!');
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	function getEarthWheel(Spike, lat, lng) { return (calcWheel(getEarthCross(Spike, lat, lng))); }
	function getMoonWheel(Spike) { return (calcWheel(getMoonCross(Spike))); }
	function getSunWheel(Spike) { return (calcWheel(getSunCross(Spike))); }

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function calcWheel(dragonCross)	{
		var Wheel = [];
		var serpentCross = [];
		var stalkerCross = [];
		var helixCross = [];

		for (var i = 0;  i < (dragonCross.length - 1);  i++) {
			serpentCross.push(middleSpike(dragonCross[i], dragonCross[i+1]));
			stalkerCross.push(middleSpike(dragonCross[i], serpentCross[i]));
			helixCross.push(middleSpike(serpentCross[i], dragonCross[i+1]));
			Wheel.push(dragonCross[i]);
			Wheel.push(stalkerCross[i]);
			Wheel.push(serpentCross[i]);
			Wheel.push(helixCross[i]);
		};
		Wheel.push(dragonCross[4]);
		return Wheel;
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function middleSpike(momA, momB) {
		var middle = parseInt(Math.abs(momB.diff(momA)/2));
		var momX = moment(momA);
		if (momA.isBefore(momB)) {
			momX.add(middle, 'ms');
			return(momX);
		} else if (momB.isBefore(momA)) {
			momX = moment(momB);
			momX.add(middle, 'ms');
			return(momX);
		} else if (momA.isSame(momB)) {
			return momA;
		} else {
			console.log("AN UNKNOWN ERROR!!"); return;
		};
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function getEarthCross(point, lat, lng) {
		var p = moment(point);
		var testEarthCross = calculEarthCross(point, lat, lng);
		var EarthCross = [];
		var testEarthDragon = testEarthCross[0];
		if (testEarthDragon.isBefore(point)) {
			EarthCross = testEarthCross; p.add(1, 'days');
			testEarthCross = calculEarthCross(p, lat, lng);
			EarthCross.push(testEarthCross[0]);
			return EarthCross;
		} else if (testEarthDragon.isAfter(point)) {
			p.subtract(1, 'days');
			testEarthCross = calculEarthCross(p, lat, lng);
			EarthCross = testEarthCross; p.add(1, 'days');
			testEarthCross = calculEarthCross(p, lat, lng);
			EarthCross.push(testEarthCross[0]);
			return EarthCross;
		} else if (testEarthDragon.isSame(point)) {
			EarthCross = testEarthCross; p.add(1, 'days');
			testEarthCross = calculEarthCross(p, lat, lng);
			EarthCross.push(testEarthCross[0]);
			return EarthCross;
		} else {
			console.log("AN UNKNOWN ERROR IN 'getEarthCross'!!");
			return false;
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	function getMoonCross(Spike) {
		var Illumin =  [0.25, 0.5, 0.75, 1];
		var futureTribe = false;
		var moonCross = [];
		var workMom = moment(Spike);
		var IllumDiff = Illumin[0] - getMoonIllum(workMom);
		if (IllumDiff > 0.01) {
			workMom.subtract(14, 'days');
		};
		moonCross.push(getMoonQuill(workMom, Illumin[0], futureTribe));  futureTribe = true;
		moonCross.push(getMoonQuill(workMom, Illumin[1], futureTribe));
		moonCross.push(getMoonQuill(workMom, Illumin[2], futureTribe));
		moonCross.push(getMoonQuill(workMom, Illumin[3], futureTribe));   workMom.add(1, 'days');
		moonCross.push(getMoonQuill(workMom, Illumin[0], futureTribe));
		return moonCross;
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function getSunCross(Spike) {
		var testSunCross = calculSunCross(Spike.year());
		var testSunDragon = testSunCross[0];

		if  (testSunDragon.isBefore(Spike)) {
			return testSunCross;
		} else if (testSunDragon.isAfter(Spike)) {
			testSunCross = calculSunCross(Spike.year()-1);
			return testSunCross;
		} else if (testSunDragon.isSame(Spike)) {
			return testSunCross;
		} else {
			console.log("AN UNKNOWN ERROR!!");
			return false;
		};
	}
	
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function calculEarthCross(date, lat, lng) { 
		var times = [-0.833, 'sunrise',  'sunset' ];
		var  J0  =   0.0009;

		function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }
		function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
		function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }
		function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
		function getSetJ(h, lw, phi, dec, n, M, L) { 
			var w = hourAngle(h, phi, dec),
			a = approxTransit(w, lw, n);
			return solarTransitJ(a, M, L);  
		}

		var lw = rad * -lng,
		phi = rad * lat,
		d = toDays(date), 
		n = julianCycle(d, lw), 
		ds = approxTransit(0, lw, n),
		M = solarMeanAnomaly(ds),
		L = eclipticLongitude(M),
		dec = declination(L, 0), 
		Jnoon = solarTransitJ(ds, M, L),
		i, len, time, Jset, Jrise; 
		var result =  { zenith: fromJulian(Jnoon),  
		nadir: fromJulian(Jnoon - 0.5) };
		Jset = getSetJ(times[0] * rad, lw, phi, dec, n, M, L);
		Jrise = Jnoon - (Jset - Jnoon);
		result[times[1]] = fromJulian(Jrise);
		result[times[2]] = fromJulian(Jset);
		var earthCross = [];
		earthCross.push(moment(result.sunrise.valueOf(), 'x'));
		earthCross.push(moment(result.zenith.valueOf(), 'x'));
		earthCross.push(moment(result.sunset.valueOf(), 'x'));
		earthCross.push(moment(result.nadir.valueOf(), 'x'));
		earthCross[3].add(1, 'days');
		return earthCross;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function getMoonQuill(workMom, Illum, futureTribe) {
		var openGate  = false;
		var Durations =	[
							moment.duration(1, 'days'),
							moment.duration(1, 'hours'),
							moment.duration(1, 'minutes'),
							moment.duration(1, 'seconds')
						];

		function upDur(workDur) {
			var addMom = moment(workMom).add(workDur);
			while ((Illum - getMoonIllum(addMom)) > 0) {
				openGate = Boolean(Math.abs(getMoonIllum(addMom) - getMoonIllum(workMom)) < 0.1);
				if (openGate) {
					workMom.add(workDur);
					addMom = moment(workMom).add(workDur);
				} else { return; };
			};
		}

		function downDur(workDur) {
			var subMom = moment(workMom).subtract(workDur);
			while ((getMoonIllum(subMom) - Illum) > 0) {
				openGate = Boolean(Math.abs(getMoonIllum(workMom) - getMoonIllum(subMom)) < 0.1);
				if (openGate) {
					workMom.subtract(workDur); subMom = moment(workMom).subtract(workDur);
				} else { return; };
			};
		}

		Durations.forEach(function(workDur) {
			if (futureTribe) {
				upDur(workDur)
			} else {
				downDur(workDur)
			} 
		});
		return moment(workMom);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function calculSunCross(year) {
		var  Y = year;
		var y1 = Y/1000;
		var jd1 = 1721139.2855 + 365.2421376*Y + 0.0679190*y1*y1 - 0.0027879*y1*y1*y1;
		var jd2 = 1721233.2486 + 365.2417284*Y - 0.0530180*y1*y1 + 0.0093320*y1*y1*y1;
		var jd3 = 1721325.6978 + 365.2425055*Y - 0.1266890*y1*y1 + 0.0019401*y1*y1*y1;
		var jd4 = 1721414.3920 + 365.2428898*Y - 0.0109650*y1*y1 - 0.0084885*y1*y1*y1;
		var jd5 = 1721139.2855 + 365.2421376*(Y+1) + 0.0679190*y1*y1 - 0.0027879*y1*y1*y1;
		var julianSunCross = new Array(jd1, jd2, jd3, jd4, jd5);
		var stringSunCross = [];
		var testSunCross  = [];
		for (var i = 0; i < julianSunCross.length; i++) {
			stringSunCross[i] = new String(Julian2Gregorian(julianSunCross[i]));
			testSunCross[i] = moment(stringSunCross[i], 'YYYY MM DD HH:mm Z');
		};
		return testSunCross;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// INNER ASTRONOMIC CONSTANT AND FUNCTIONS:

	var PI 	= Math.PI,
		sin  = Math.sin,
		cos  = Math.cos,
		tan  = Math.tan,
		asin = Math.asin,
		acos = Math.acos,
		atan = Math.atan2,
		rad  = PI / 180;

	var dayMs = 1000 * 60 * 60 * 24,
		e = rad * 23.4397,
		J1970 = 2440588,
		J2000 = 2451545;

	function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; } 
	function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }  
	function toDays(date)   { return toJulian(date) - J2000; }             
	function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }
	function declination(l, b) { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }
	function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
	function eclipticLongitude(M) { 
		var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), P = rad * 102.9372;
		return M + C + P + PI;
	}

	function sunCoords(d) {
		var M = solarMeanAnomaly(d), L = eclipticLongitude(M);
		return { dec: declination(L, 0), ra: rightAscension(L, 0) };
	}

	function moonCoords(d) { 
		var L = rad * (218.316 + 13.176396 * d),
		M = rad * (134.963 + 13.064993 * d),
		F = rad * (93.272 + 13.229350 * d), 
		l  = L + rad * 6.289 * sin(M),
		b  = rad * 5.128 * sin(F),   
		dt = 385001 - 20905 * cos(M);
		return { ra: rightAscension(l, b), dec: declination(l, b), dist: dt };
	}

	function getMoonIllum(date) {
		var d = toDays(date),
		s = sunCoords(d),
		m = moonCoords(d),
		sdist = 149598000, // distance from Earth to Sun in km
		phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
		inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
		angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
				cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
		var phase = 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI;
		return phase;
	}

	function Julian2Gregorian(julianNum) {
		var I = parseInt(julianNum + 0.50);
		var F = (julianNum + 0.50) - I;
		var A = 0;
		var B = 0;
		if (I >= 2229160) {
			A = parseInt((I - 1867216.25)/36524.25);
			B = I + 1 + A - parseInt(A/4);
		} else { B = I; };
		var C = B + 1524;
		var D = parseInt((C - 122.1)/365.25);
		var E = parseInt(365.25*D);
		var G = parseInt((C - E)/30.6001);
		var decimalDay = C - E + F - parseInt(30.6001*G); decimalDay = decimalDay;  
		var month = 0;
		if (G < 13.5) {
			month = G - 1;
		} else if (G > 13.5) {
			month = G - 13;
		};
		var year = 0;
		if (month > 2.5) {
			year = D - 4716;
		} else if (month < 2.5) {
			year = D - 4715;
		};
		var dd_dec = Math.abs(decimalDay);
		var dd = parseInt(dd_dec);                
		var hh = parseInt((dd_dec - dd)*24);      
		var mm = parseInt(((dd_dec - dd)*24 - hh)*60);
		var stringGregorian = year + " " + month + " " + dd + " " + hh + ":" + mm;
		return stringGregorian;
	}

}
//****************************************************************************************
// Greatly thanks "(c) 2011-2014, Vladimir Agafonkin"  for his code "SunCalc"    *********
//****************************************************************************************
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// END OF "GATE" OBJECT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// эта функция была нужна для подсчёта средней длительности циклов в миллисекундах
function middleWheelDuration (Wheel, stick, Count) {
	var totalTime = 0;
	for (var x = 0; x < Count; x++) {
		var wheels = stick.wheels;
		var wheelBegin = wheels[Wheel][0];
		var wheelEnd = wheels[Wheel][16];
		var wheelDur = wheelBegin.diff(wheelEnd);
		totalTime = totalTime + wheelDur;
		// console.log('wheelDur:', wheelDur);
		switch (Wheel) { 
			case 'sun': 	stick.pike.add(17, 'months'); break;
			case 'moon': 	stick.pike.add(38, 'days'); break;
			case 'earth': 	stick.pike.add(33, 'hours'); break;
		};
		stick.wheels = gate.getWheels(stick);
	}
	var middleDur = parseInt(totalTime / Count);
	// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	// console.log('middleDur:', middleDur);
	return middleDur;
}