var http = require('http');
var fs = require('fs');
var connect = require('connect');

var writeStream = fs.createWriteStream('./log.txt', 
	{
		'flags' : 'a',
		'encoding' : 'utf8',
		'mode' : 0666
	});

http.createServer(connect()
	.use(connect.favicon( __dirname + '/public/favicon.ico'))
	.use(connect.logger({ format:'dev', stream : writeStream }) )
	.use(connect.static( __dirname + '/public/' ), {redirect: true})
	).listen(8124);

