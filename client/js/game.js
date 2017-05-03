var game = new Game();
var positionMap = new Map();

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
  positionMap.set(name, ypos);
});

function Game() {
  var canvas = document.getElementById("game");
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";
  this.mouse = new MouseListener();

  this.players = {};
}

Game.prototype.draw = function(){
  this.context.clearRect(0, 0, this.width, this.height);
  for (var [key, value] of positionMap.entries()) {
    console.log(key + ' = ' + value);
    this.context.fillText(key, this.width/2, value);
  }
}

Game.prototype.update = function(){
  // send mouse position
  // console.log("mouse at: "+this.mouse.ypos);

  socket.emit("mouse update", this.mouse.ypos);
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
    // Call the main loop again at a frame rate of 30fps
    setTimeout(MainLoop, 33.3333);
  }
