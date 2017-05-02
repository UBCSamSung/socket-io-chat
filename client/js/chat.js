var playerName
var socket = io();
$(document).ready(function(){
  $("form").submit(function(){
    socket.emit('chat message', $('#message_input').val());
    $("#message_input").val("");
    return false;
  });
  socket.on('chat message', function(msg){
    $("#messages").append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});