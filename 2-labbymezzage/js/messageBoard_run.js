"use strict";
window.onload = function () {

  var messageBoard1 =  new MessageBoard("board1"),
    messageBoard2 = new MessageBoard("board2");

  messageBoard1.init();
  messageBoard2.init();
};
