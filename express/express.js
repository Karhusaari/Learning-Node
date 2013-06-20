var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("welcome to node twitter.");
}).listen(8000);