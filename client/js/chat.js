$(document).ready(function(){
  // enter chat
  $("#chat_button").click(function() {
    if ($("#name_input").val().length==0) {
      $("#name_input").val("");
      $("#name_input").focus();
      return false;
    }
    $("#welcome").hide();
    $("#chat").show();
    socket.emit("new user", $("#name_input").val());
    return false;
  });
  // send message
  $("#chat_form").submit(function(){
    if ($("#chat_input").val().length==0) {
      $("#chat_input").val("");
      $("#chat_input").focus();
      return false;
    }
    socket.emit('chat message', $('#chat_input').val());
    $("#chat_input").val("");
    $("#chat_input").focus();
    return false;
  });
  // receive message
  socket.on('chat message', function(msg){
    $("#messages").append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  }); 
});