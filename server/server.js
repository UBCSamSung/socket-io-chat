var express = require('express');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var HashMap = require('hashmap');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

var userMap = new HashMap();

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		var full_msg = userMap.get(socket.id) + ": " + msg;
		console.log(full_msg);
		io.emit('chat message', full_msg);
	});
	socket.on('new user', function(name) {
		userMap.set(socket.id, name);
		var full_msg = userMap.get(socket.id) + " has entered the chat.";
		console.log(full_msg);
		io.emit('chat message', full_msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
