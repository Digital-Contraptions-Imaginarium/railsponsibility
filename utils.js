var AsyncCache = require('async-cache'),
	csv = require('csv'),
	path = require('path');

var STATION_CODES_CONVERSION_CACHE_SIZE = 100, // TODO: does this number make sense?
	STATION_CODES = null;

exports.dateToCSVDate = function (d) {
	return d.getFullYear() + "/" + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + "/" + (d.getDate() < 10 ? '0' : '') + d.getDate() + " " + (d.getHours() < 10 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
}

exports.log = function (s) {
	if (process.env.NODEJITSU !=== "TRUE") console.log(exports.dateToCSVDate(new Date()) + " - " + s);
}

var stationCodesInitialiseCached = new AsyncCache({ 
	'maxAge': 24 * 60 * 60000, // 1 day 
	'load': function (key, callback) {
	    csv()
	        .from.path(path.join(__dirname, "railwaycodes_org_uk.csv"), {
	            columns: true
	        })  
	        .to.array(function (stationCodes) {
	        	STATION_CODES = stationCodes
	            callback(null, null);
	        });
	}
});

function stationCodesInitialise (callback) {
	stationCodesInitialiseCached.get(null, callback);
}

var crs2tiplocCached = new AsyncCache({
	'max': STATION_CODES_CONVERSION_CACHE_SIZE, 
	'load': function (key, callback) {
		stationCodesInitialise(function (err) {
			callback(null, STATION_CODES.reduce(function (memo, sc) {
				if (sc.crs === key) memo.push(sc.tiploc);
				return memo;
			}, [ ]).sort());
		});
	}
});

exports.crs2tiploc = function (crs, callback) {
	crs2tiplocCached.get(crs.toUpperCase(), callback);
};

var tiploc2crsCached = new AsyncCache({
	'max': STATION_CODES_CONVERSION_CACHE_SIZE, 
	'load': function (key, callback) {
		stationCodesInitialise(function (err) {
			callback(null, (STATION_CODES.filter(function (sc) {
				return sc.tiploc === key;
			})[0] || { 'crs': undefined }).crs);
		});
	}
});

exports.tiploc2crs = function (tiploc, callback) {
	tiploc2crsCached.get(tiploc.toUpperCase(), callback);
};

var tiploc2stanoxCached = new AsyncCache({
	'max': STATION_CODES_CONVERSION_CACHE_SIZE, 
	'load': function (key, callback) {
		stationCodesInitialise(function (err) {
			var station = STATION_CODES.filter(function (sc) {
				return sc.tiploc === key;
			})[0];
			callback(null, station ? station.stanox : null);
		});
	}
});

exports.tiploc2stanox = function (tiploc, callback) {
	tiploc2stanoxCached.get(tiploc.toUpperCase(), callback);
};

var stanox2tiplocCached = new AsyncCache({
	'max': STATION_CODES_CONVERSION_CACHE_SIZE, 
	'load': function (key, callback) {
		stationCodesInitialise(function (err) {
			var station = STATION_CODES.filter(function (sc) {
				return sc.stanox === key;
			})[0];
			callback(null, station ? station.tiploc : null);
		});
	}
});

exports.stanox2tiploc = function (stanox, callback) {
	stanox2tiplocCached.get('' + stanox, callback);
};
