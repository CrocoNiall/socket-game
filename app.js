var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var http        = require('http').createServer(app);
var morgan      = require('morgan');
var io          = require('socket.io')(http);


app.get("/", function (req, res) {
  res.sendfile('public/index.html');
});

app.get("/mobile", function (req, res) {
  res.sendfile('public/controller/index.html');
});

var clients = {};

io.on('connection', function(socket){

  console.log('User Connected' + socket.id);
    
  socket.on('join_game', function(user){
    clients[socket.id] = socket;
  })

  socket.on('controller_key_press', function(data){
    io.emit("player-moved", data);
  });

});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

http.listen(port, function () {
  console.log('Server started on port ' + port + '…');
});
