var socket = io();

$(document).ready(function(){

  $("#name_form").submit(function(){
    return false;
  });

  socket.on('chat message', function(msg){
    $("#messages").append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });  
  socket.on('disconnect', function () {
      socket.close();
      alert("disconnected");
      location.reload();
  });
});