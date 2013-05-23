var fs = require("fs");

var writeStream = fs.createWriteStream("./log.txt", 
	{
		'flags': 'a',
		'encoding': 'utf8',
		'mode': 0666
	});

try{
	fs.readdir('./files/', function(err, files){
		files.forEach(function(name){

			fs.stat('./files/' + name, function(err, stats){
				if(err) throw err;
				if( stats.isFile() ){
					fs.readFile('./files/' + name, 'utf8', function(err, data){
					if(err){ throw err; }
						var adjData = data.replace(/karhusaari/g, "bjornholm");

						fs.writeFile("./files/" + name, adjData, function(err){
							if(err){ throw err; }

							//log
							writeStream.write('\nchanged: ' + name + '\n', 'utf8', function(err){
								if(err){ throw err; }
							});
						});

					});
				}
			});
			
		});
	});
}catch(err){
	console.error( util.inspect(err) );
}