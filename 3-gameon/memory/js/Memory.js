"use strict";

function Memory (cols, rows, node) {

  var pictures = [];

  this.getNodeName = function () { return node; };

  this.getSize = function () { return { rows: rows, cols: cols }; };

}


Memory.prototype.start = function (pics) {

  var oldBoard,

    gameNode = document.getNode(this.getNodeName()),

    newBoard = document.buildElement({
      element: "div",
      className: "board",
    });


    var game = Memory.prototype.generateTable(pics, this.getSize().cols);
    newBoard.appendChild(game);

  console.log(pics);

  if(gameNode.hasChildNodes()) {

    oldBoard = document.getNode(this.getNodeName(), "board");
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