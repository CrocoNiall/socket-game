
var Player = function (x, y) {
  var self = this;

  self.checkKey = function (e) {
      e = e || window.event;

      if (/38|up/gi.test(e.keyCode)) {
          self.move(self.x - 1, self.y);
      } else if (/40|down/gi.test(e.keyCode)) {
          self.move(self.x + 1, self.y);
      } else if (/37|left/gi.test(e.keyCode)) {
        self.move(self.x, self.y - 1);
      } else if (/39|right/gi.test(e.keyCode)) {
         self.move(self.x, self.y + 1);
      }

  }

  self.init = function (x, y) {
    self.x = x;
    self.y = y;
    document.onkeydown = self.checkKey;

    self.socket = io();
    self.socket.on('player-moved', function (data){
        self.checkKey({ keyCode: data.key})
        console.log(data);
      
    })
  }

  self.move = function (newX, newY) {

    var isCollision = self.isCollision(newX, newY);

    if (!isCollision) {

      var $oldCell = $("[data-col='" + self.x + "'][data-index='" + self.y + "']");
      $oldCell.removeClass("player");

      var $newCell = $("[data-col='" + newX + "'][data-index='" + newY + "']");
      $newCell.addClass("player");
                     
      self.x = newX
      self.y = newY
    }


  }


  self.isCollision = function (x, y) {
   return x == '-1' || x == '12' || y == '-1' || y == '12'
  }

  self.init(x, y);
}


var Game = function () {
  var self = this;

  self.init = function () {
    self.$cells = $("td");
    self.setUpGrid();
    self.player = new Player(0, 0);


  }

  self.setUpGrid = function () {
    self.$cells.each(function () {
      // $(this).addClass("black");
    });
  }

  self.init();
}

var game = new Game();




