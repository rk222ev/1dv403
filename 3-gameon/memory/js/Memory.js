"use strict";

function Memory (rows, cols, node) {


  this.getNode = function () { return document.getNode(node); };

  this.getSize = function () { return { rows: rows, cols: cols }; };

}


Memory.prototype.start = function () {

  var gameNode = this.getNode();

  console.log("At start()");

  var board = document.buildElement({ element: "div", className: "board", innerHTML: "Test"});

  gameNode.appendChild(board);





};