var path = require('path');
var http = require('http');
var express = require('express');
var hbs = require('hbs');
var zillow = new (require('node-zillow'))('X1-ZWz1e1hss309vv_89sjr');

hbs.registerPartials(__dirname + '/views/partials');

var server = express()
	.set('view engine', 'html')
	.engine('html', hbs.__express)
	.use(express.bodyParser())

server.get('/', function(req,res){
	res.render("index.html")
});

server
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))

var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);



