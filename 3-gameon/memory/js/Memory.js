"use strict";

function Memory (rows, cols, node) {

  var pictures = [];

  this.getNodeName = function () { return node; };

  this.getSize = function () { return { rows: rows, cols: cols }; };

}


Memory.prototype.start = function () {

  var oldBoard,

    gameNode = document.getNode(this.getNodeName()),

    newBoard = document.buildElement({
      element: "div",
      className: "board",
      innerHTML: "Test"
    });



if(gameNode.hasChildNodes()) {

  oldBoard = document.getNode(this.getNodeName(), "board");
  gameNode.replaceChild(oldBoard, newBoard);

} else {

  gameNode.appendChild(newBoard);

}





};