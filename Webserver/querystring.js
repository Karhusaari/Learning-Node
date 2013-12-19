var http = require("http");
var querystring = require("querystring");

http.createServer(function(req, res){
	/* Parse everything after ? into name/value pairs */
	var qs = querystring.parse(req.url.split("?")[1] )
	var userName = qs.firstName + " " + qs.lastName;
	var html = "<!doctype html>"
	html += "<html><head><title>Hullo " + userName + "</title></head>";
	html += "<body><h1>" + userName + "</h1></body></html>";

	res.end(html);
}).listen(8000);