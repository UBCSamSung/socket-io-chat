var express = require('express');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var HashMap = require('hashmap');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

var nameMap = new HashMap();
var yposMap = new HashMap();

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		var full_msg = nameMap.get(socket.id) + ": " + msg;
		console.log(full_msg);
		io.emit('chat message', full_msg);
	});
	socket.on('new user', function(name) {
		nameMap.set(socket.id, name);
		var full_msg = nameMap.get(socket.id) + " has entered the chat.";
		console.log(full_msg);
		io.emit('chat message', full_msg);
	});

	socket.on('new player', function(name) {
		nameMap.set(socket.id, name);
		var full_msg = nameMap.get(socket.id) + " has entered the game.";
		console.log(full_msg);
	})
	socket.on('mouse update', function(ypos) {
		// var full_msg = "player "+nameMap.get(socket.id)+"'s mouse has moved to ypos: "+ypos;
		yposMap.set(socket.id, ypos);
		io.emit('player position', nameMap.get(socket.id), ypos);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
