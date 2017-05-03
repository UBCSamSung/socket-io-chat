var socket = io();

$(document).ready(function(){

  $("#play_button").click(function(ev) {
    $("#welcome").hide();
    $("#play").show();
    return false;
  });
  $("#name_form").submit(function(){
    return false;
  });
  
});