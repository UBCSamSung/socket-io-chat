var express = require('express');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var global = require('./global');
var logic = require('./logic');
app.use(express.static(__dirname + '/../client'));

var nameMap = new Map(); // key: socket.id; value: name
var yposMap = new Map(); // key: socket.id; value: ypos

function Game() {
	// everything is stored in relative position 
  this.width = 100;
  this.height = 100;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";
  this.mouse = new MouseListener();

  this.players = new Map();
}

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg) {
		if (!nameMap.has(socket.id)) {
			socket.disconnect;
		}
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
		if (!nameMap.has(socket.id)) {
			socket.disconnect;
		}
		yposMap.set(socket.id, ypos);
		io.emit('player position', nameMap.get(socket.id), ypos);
	});

	socket.on('disconnect', function(){
		nameMap.delete(socket.id);
		yposMap.delete(socket.id);
		console.log('user disconnected');
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
