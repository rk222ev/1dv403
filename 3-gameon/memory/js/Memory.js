"use strict";

/*global document, window*/

function Memory (cols, rows, nodeName) {

  var pictures = [],
    turnedPics = [],
    picFolder = "pics/";

  // Gets assigned a reference to the game element node.
  this.node = (function () { return document.querySelector("#" + nodeName); })();

  this.clearTurned = function () { turnedPics = []; };

  this.getSize = function () { return { rows: rows, cols: cols }; };

  this.getTurnedPics = function () { return turnedPics; };

  this.setPicAsTurned = function (pic) { turnedPics.push(pic); };

  this.getPicFolder = function () { return picFolder; };

  this.getPictureLink = function (img) {

    var index = Array.prototype.indexOf.call(this.node.querySelectorAll("img"), img);

    return picFolder + pictures[index] + ".png";

  };

  this.start = function (picsArray) {
    pictures = picsArray;
    this.buildBoard(pictures);

  };

}

// ***************************************
// Creates and starts the game.
// ***************************************
Memory.prototype.buildBoard = function (pics) {

  var oldBoard,
    gameNode = this.node,
    newBoard = document.createElement("div"),
    game = this.generateTable(pics, this.getSize().cols);

  newBoard.classList.add("board");
  newBoard.appendChild(game);

  if(gameNode.hasChildNodes()) {

    oldBoard = this.node.querySelector(".board");
    gameNode.replaceChild(oldBoard, newBoard);

  } else {

    gameNode.appendChild(newBoard);

  }
};


// ***************************************
// Paints the playing board.
// Returns the new table Element.
// ***************************************
Memory.prototype.generateTable = function (picArray, cols) {

  var that = this,
    i,
    rowMembers = 0,
    tr = document.createElement("tr"),
    table = document.createElement("table");

  picArray.forEach( function (pic) {

    var a = document.createElement("a"),
      td = document.createElement("td"),
      img = document.createElement("img");

    img.src = "pics/0.png";

    a.setAttribute("href", "#");
    a.appendChild(img);
    td.appendChild(a);
    tr.appendChild(td);
    rowMembers += 1;

    if (rowMembers === cols) {
      table.appendChild(tr);
      tr = document.createElement("tr");
      rowMembers = 0;
    }



  });

  table.addEventListener("click", function (e) {
   that.clicked(e);
  });

  return table;
};


// ********************************************
// Handles the event when a picture is clicked
// ********************************************
Memory.prototype.clicked = function (e) {

  var turnedPics = this.getTurnedPics();
  var board = this.node.querySelectorAll("img");
  var target = e.target;
  var that = this;


  if (target.tagName === "IMG") {
    if (turnedPics.length  !== 2) {
      target.setAttribute("src", this.getPictureLink(target));
      this.setPicAsTurned(target);

    }

    if (turnedPics.length === 2) {

      if (turnedPics[0].src === turnedPics[1].src) {
        this.clearTurned();

      } else {
       window.setTimeout(function () { that.noMatch(turnedPics); }, 1000);

      }
    }

  }

};

//**********************************
// Resets the turned pics and
// clears the turned pictures array.
//**********************************
Memory.prototype.noMatch = function (pics) {

  var that = this;

  pics.forEach( function (pic) {
    pic.setAttribute("src", that.getPicFolder() + "0.png");

  });

  this.clearTurned();
};
