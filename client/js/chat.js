$(document).ready(function(){
  $("#chat_button").click(function() {
    $("#welcome").hide();
    $("#chat").show();
    socket.emit("new user", $("#name_input").val());
    return false;
  });
  $("#chat_form").submit(function(){
    socket.emit('chat message', $('#chat_input').val());
    $("#chat_input").val("");
    $("#chat_input").focus();
    return false;
  });
  socket.on('chat message', function(msg){
    $("#messages").append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
});