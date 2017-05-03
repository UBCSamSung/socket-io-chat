var game = new Game();

$(document).ready(function(){
  $("#play_button").click(function() {
    socket.emit("new player", $("#name_input").val());
    $("#welcome").hide();
    $("#play").show();
    MainLoop();
    return false;
  });
});

socket.on('player position', function(name, ypos){
  game.players.set(name, ypos);
});

function Game() {
  var canvas = document.getElementById("game");
  canvas.width = window.innerWidth-30;
  canvas.height = window.innerHeight;
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";
  this.mouse = new MouseListener();

  this.players = new Map();
}

Game.prototype.draw = function(){
  this.context.clearRect(0, 0, this.width, this.height);
  for (var [key, value] of this.players.entries()) {
    console.log(key + ' = ' + value);
    this.context.fillText(key, this.width/2, toAbsolutePos(value,this.height));
  }
}

Game.prototype.update = function(){
  socket.emit("mouse update", toRelativePos(this.mouse.ypos, this.height));
}

function toAbsolutePos(rel_pos, max_pos) {
  return rel_pos*max_pos;
}

function toRelativePos(abs_pos, max_pos) {
  return abs_pos/max_pos;
}

function MouseListener() {
  this.ypos = 0;
}

$("#game").mousemove(function(event) {
  game.mouse.ypos = event.pageY;
});

function MainLoop() {
  game.update();
  game.draw();
    // fps = 100 ms per frame or 1000/100 fps
    setTimeout(MainLoop, 100);
  }
