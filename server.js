var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var webpack = require('webpack');

// var webpackConfig = require('./webpack.config');
// var compiler = webpacl(webpackConfig);

app.use(express.static('dist'));
// app.use(require("webpack-dev-middleware")(compiler, {
// 	noInfo: true, 
// 	publicPath: webpackConfig.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler));

var getTime = function() {
	return new Date().toString().split(' ')[4];
}

io.on('connection', function(socket){
	var time = getTime();
	userConnectionMsg = time + ': a new user connected';
	console.log(userConnectionMsg);
	socket.broadcast.emit('message', userConnectionMsg);

	socket.on('message', function(msg){
		var time = getTime();
		var logMessage = time + ': ' + msg;
		console.log(logMessage);
		socket.broadcast.emit('message', logMessage);
	});
	socket.on('disconnect', function(){
		var time = getTime();
		console.log(time + ': user disconnected');
	});
});

// app.get('/data', function(req, res){
// 	res.json(data);
// });

var port = 1337;

http.listen(port, function(){
	console.log('listening on http://localhost:' + port);
});