var express = require('express');
var app     = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var global = require('./global');
var GameState = require('./GameState');
app.use(express.static(__dirname + '/../client'));

var nameMap = new Map();
var gameState = new GameState();



function tick() {
	if (gameState.isPaused) return;
    gameState.update();
	// send new gameState to players
	io.to("game room").emit('game state', gameState);
    // fps = 100 ms per frame or 1000/100 fps
    setTimeout(tick, 100);
}

// socket.io
io.on('connection', function(socket){
	console.log('a user connected');
	// send message to people in chat room
	socket.on('chat message', function(msg) {
		if (!nameMap.has(socket.id)) {
			socket.disconnect;
		}
		var full_msg = nameMap.get(socket.id) + ": " + msg;
		console.log(full_msg);
		io.to("chat room").emit('chat message', full_msg);
	});
	// register someone to chat room
	socket.on('new user', function(name) {
		nameMap.set(socket.id, name);
		socket.join("chat room");
		var full_msg = nameMap.get(socket.id) + " has entered the chat.";
		console.log(full_msg);
		io.to("chat room").emit('chat message', full_msg);
	});
	// register someone to game room
	socket.on('new player', function(name) {
		nameMap.set(socket.id, name);
		socket.join("game room");
		var full_msg = nameMap.get(socket.id) + " has entered the game.";
		console.log(full_msg);
		// start the game
		tick();
	})
	// update the mouse position of a user
	socket.on('mouse update', function(y) {
		if (!nameMap.has(socket.id)) {
			socket.disconnect;
		}
		gameState.players.set(socket.id, y);
		io.emit('player position', nameMap.get(socket.id), gameState.players.get(socket.id));
	});

	socket.on('disconnect', function(){
		nameMap.delete(socket.id);
		gameState.players.delete(socket.id);
		console.log('user disconnected');
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
