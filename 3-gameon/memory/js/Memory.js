"use strict";

function Memory (cols, rows, nodeName) {

  var pictures = [];
  
  this.node = (function () { return document.querySelector("#" + nodeName) })();

  this.getSize = function () { return { rows: rows, cols: cols }; };

}


Memory.prototype.start = function (pics) {

  var oldBoard,

    gameNode = this.node,

    newBoard = document.buildElement({
      element: "div",
      className: "board",
    }),

    game = Memory.prototype.generateTable(pics, this.getSize().cols);


  newBoard.appendChild(game);

  if(gameNode.hasChildNodes()) {

    oldBoard = this.node.querySelector(".board");
    gameNode.replaceChild(oldBoard, newBoard);

  } else {

    gameNode.appendChild(newBoard);

  }



};


Memory.prototype.generateTable = function (array, cols) {

  var i,
    tr = document.createElement("tr"),
    rowMembers = 0,
    table = document.createElement("table");

  array.forEach( function (pic) {

    var td = document.createElement("td"),

      img = document.buildElement({
        element: "img",
        src: "pics/" + pic +".png"
      });

    if (rowMembers === cols) {
      table.appendChild(tr);
      tr = document.createElement("tr");
      rowMembers = 0;

    }

    td.appendChild(img);
    tr.appendChild(td);
    rowMembers += 1;

  });

  return table;
};