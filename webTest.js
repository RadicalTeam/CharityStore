var http = require('http');

var server = http.createServer(function(req,res){
	console.log('connect success');
	res.statusCode = "200";
	res.setHeader('Content-Type','text/plain');
	res.end("connect success");
}).listen(80);