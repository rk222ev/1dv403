"use strict";

function Memory (rows, cols, node) {

  var pictures = [];

  this.getNodeName = function () { return node; };

  this.getSize = function () { return { rows: rows, cols: cols }; };

}


Memory.prototype.start = function () {

  var gameNode = document.getNode(this.getNodeName()),
    oldBoard;



  var newBoard = document.buildElement({
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