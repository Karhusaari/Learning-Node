var fs = require("fs");
var async = require("async");
var util = require("util");
var _dir = "./files/";

var writeStream = fs.createWriteStream("./log.txt", 
	{
		'flags': 'a',
		'encoding': 'utf8',
		'mode': 0666
	});

try{
	async.waterfall([

		function readDir(callback){
			fs.readdir(_dir, function(err, files){
				callback(err, files);
			});
		},

		function loopFiles(files, callback){
			files.forEach(function(name){
				callback(null, name);
			});
		},

		function checkFile(file, callback){
			fs.stat(_dir + file, function(err, stats){
				callback(err, stats, file);
			});
		},

		function readData(stats, file, callback){
			if( stats.isFile() ){
				fs.readFile(_dir + file, 'utf8', function(err, data){
					callback(err, file, data);
				});
			}
		},

		function modify(file, text, callback){
			var adjData = text.replace(/bjornholm/g, "karhusaari");
			callback(null, file, adjData);
		},

		function writeData(file, text, callback){
			fs.writeFile(_dir + file, text, function(err){
				callback(err, file);
			});
		},

		function logChange(file, callback){

			util.log('File Changed: ' + file);
			/*
			writeStream.write("Changed: " + file + "\n", "utf8", function(err){
				callback(err, file);
			});
			*/
		},

	], function(err, result){
		if(err){
			throw err;
		}else{
			console.log("modified: " + result);
		}
	});

}catch(err){
	console.error( util.inspect(err) );
}