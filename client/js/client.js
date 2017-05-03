var socket = io();

$(document).ready(function(){

  $("#name_form").submit(function(){
    return false;
  });
 
  socket.on('disconnect', function () {
      socket.close();
      alert("disconnected");
      location.reload();
  });
});