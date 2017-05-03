// gameState store essential game parameters
function GameState() {
	this.isPaused = false;
	// everything is stored in relative position 
  this.players = new Map();
  this.p1 = new P1();
  this.p2 = new P2();
  this.ball = new Ball();
}

function P1() {
	this.x = 5;
	this.y = 50;
	this.width = 2;
    this.height = 20;
	this.score = 0;
}

function P2() {
	this.x = 95;
	this.y = 50;
	this.width = 2;
    this.height = 20;
	this.score = 0;
}

function Ball() {
	this.x = 50;
	this.y = 50;
	this.vx = 1;
	this.vy = 0;
	this.width = 5;
	this.height = 5;
}

GameState.prototype.update = function () {
	// update player position
	// update ball position (check collision)
	// pass new state to players
	console.log("updating...");
}

module.exports = GameState;