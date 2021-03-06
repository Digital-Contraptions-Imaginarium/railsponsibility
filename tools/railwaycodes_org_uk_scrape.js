/* ************************************************************************** *
   This script is a scraper for http://www.railwaycodes.org.uk/CRS/CRS0.shtm 
   until I find a more authoritative source. Licensing for the data at the 
   above url is being assessed. The codes are uploaded straight into the
   CouchDB database. 
 * ************************************************************************** */ 

var argv = require("yargs")
		.usage("Usage: $0 [--couchdb <CouchDB connection string if not >]")
		.demand([ 'couchdb' ])
		.default('couchdb', 'http://localhost:5984')
		.argv,
	async = require('async'),
	cheerio = require('cheerio'),
	log = require('../utils').log,
	nano = require('nano')(argv.couchdb)
	request = require('request'),
	_ = require('underscore'),
	_str = require('underscore.string');
_.mixin(_str.exports());

function getLetters (callback) {
	request('http://www.railwaycodes.org.uk/CRS/CRS0.shtm', function (err, response, body) {
		if (err) throw err;
		var $ = cheerio.load(body),
			letters = [ ];
		$('body p:nth-child(19) a').each(function (index, element) {
			letters.push({
				letter: $(this).text().toLowerCase(),
				url: 'http://www.railwaycodes.org.uk/CRS/' + $(this).attr('href'),
			});
		});
		callback(err, letters);
	});
}

getLetters(function (err, letters) {
	async.reduce(letters, [ ], function (memo, letter, callback) {
		request(letter.url, function (err, response, body) {
			if (err) {
				log("Letter '" + letter.letter + "'' is missing or some other kind of error.");
				callback(null, memo);
			} else {
				log("Scraping letter '" + letter.letter + "'...");
				var $ = cheerio.load(body);
				$('body table tr:nth-child(n+3)').each(function (index, element) {
					memo.push({
						'location': _.trim($('td:nth-child(1)', this).text()) || null,
						'crs': _.trim($('td:nth-child(2)', this).text()) || null,
						'nlc': _.trim($('td:nth-child(3)', this).text()) || null,
						'tiploc': _.trim($('td:nth-child(4)', this).text()) || null,
						'stanox': $('td:nth-child(5)', this).text().match(/\d+/) ? $('td:nth-child(5)', this).text().match(/\d+/)[0] : null,
					});
					// if a cell is a rowspan, I make the cell normal and
					// duplicate the values across
					for(var columnNo = 1; columnNo <= 5; columnNo++) {
						if ($('td:nth-child(' + columnNo + ')', this).attr('rowspan')) {
						    var valueToDuplicate = $('td:nth-child(' + columnNo + ')', this).text(),
						        noOfRows = $('td:nth-child(' + columnNo + ')', this).attr('rowspan');
						    $('td:nth-child(' + columnNo + ')', this).removeAttr('rowspan');
						    $('td:nth-child(' + columnNo + ')', this).parent().nextAll('tr').each(function (index, element) {
						        if (index < noOfRows - 1) $(this).find('td:nth-child(' + columnNo + ')').eq(0).before('<td>' + valueToDuplicate + '</td>');
						    });
						}
					}
				});
				callback(null, memo);
			}
		});
	}, function (err, results) {
		if (err) {
			log("Not writing to the database to avoid propagating any error scraping.");
    		// nothing to callback
		} else {
			log("Writing to the database...");
			var DB_NAME = "railwaycodes_org_uk";
			nano.db.destroy(DB_NAME, function(err) {
				nano.db.create(DB_NAME, function(err) {
				    var db = nano.use(DB_NAME);
				    db.bulk({ 'docs': results }, function (err) {
		    			if (err) throw err;
						log("Completed.");
			    		// nothing to callback
				    });
				});
			});
		}
	});
});
