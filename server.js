var path = require('path');
var http = require('http');
var express = require('express');
var hbs = require('hbs');
var zillow = new (require('node-zillow'))('X1-ZWz1e1hss309vv_89sjr');
var cheerio = require('cheerio');
var request = require('request');

hbs.registerPartials(__dirname + '/views/partials');

var server = express()
	.set('view engine', 'html')
	.engine('html', hbs.__express)
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))
	.use(express.bodyParser())

server.get('/', function(req,res){
	res.render("index.html")
});

server.post('/results', function(req,res){

	// TODO: only add if actually included in the post
	var params = {
		address: req.body.address.street,
		city: req.body.address.city,
		state: req.body.address.state,
		zip: req.body.address.zip
	}

	zillow.getDeepSearchResults(params).then(function(data){
		var house = data.response[0].results[0].result[0];
		var detailsUrl = house.links[0].homedetails[0];

		request(detailsUrl, function(err,resp,html){
			var $ = cheerio.load(html);
			var annualTax = $('#hdp-tax-history tbody tr:first-of-type td').eq(1).contents().eq(0).text().replace(/\D/g,'');
			// TODO: handle when no estimate (estimate will be empty string)
			var estimate = $('#home-value-wrapper span:contains(Zestimate)').parent().text().replace(/\D/g,'');

			// TODO: compare to potential houses
			console.log(annualTax, estimate);
		});
	});
});

server
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))

var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);



