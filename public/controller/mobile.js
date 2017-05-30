$(function () {
  var socket = io();
  connectToGame();

  function connectToGame(){
    socket.emit('join_game')
  }

  function keyPress (key) {
    socket.emit("controller_key_press", { key: key });
  }

  $(".directions").on("click", function (e) {
    var key = $(this).attr("data-key");
    keyPress(key);
  });

})
