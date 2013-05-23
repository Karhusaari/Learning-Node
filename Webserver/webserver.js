var fs = require("fs");
var http = require("http");
var path = require("path");
var config = JSON.parse( fs.readFileSync('config.json') );

var host = config.host;
var port = config.port;

http.createServer(function(req, res){
	var filename = path.basename(req.url) || "index.html";
	var ext = path.extname(filename);
	var localpath = __dirname + "/public/";

	if(ext == ".html" || ext == ".css"){
		localpath += filename;

		fs.exists(localpath, function(exists){
			if(exists){
				getFile(localpath, res);
			}else{
				res.writeHead(404);
				res.end();
			}
		});
	}
}).listen(8000);

console.log("Server started: " + host + ":" + port);

/**
 * Reads the local file and returns the request
 * 
 */
function getFile(localpath, res){
	fs.readFile(localpath, function(err, contents){
		if(!err){
			res.end(contents);
		}else{
			res.writeHead(500);
			res.end();
		}
	});
}