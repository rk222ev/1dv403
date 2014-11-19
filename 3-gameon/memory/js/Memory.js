"use strict";

/*global document, window*/

function Memory (cols, rows, nodeName) {

  var pictures = [],
    turnedPics = [];

  this.node = (function () { return document.querySelector("#" + nodeName); })();

  this.getSize = function () { return { rows: rows, cols: cols }; };

  this.getTurnedPics = function () { return turnedPics; };

  this.turnPic = function (pic, picLink) {

    var that = this,
      obj = {
        img: pic.getElementsByTagName("img")[0],
        link: picLink,
      };

    obj.img.src = "pics/" + picLink +".png";

    turnedPics.push(obj);

    if (turnedPics.length === 2) {

      if (turnedPics[0].link !== turnedPics[1].link) {

        //window.setTimeout(that.resetImages, 2000);
        window.setTimeout(that.resetImages, 1000);
      }

      turnedPics = [];
    }
  };

}

// ***************************************
// Creates and starts the game.
// ***************************************
Memory.prototype.start = function (pics) {

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
Memory.prototype.generateTable = function (array, cols) {

  var that = this,
    i,
    tr = document.createElement("tr"),
    rowMembers = 0,
    table = document.createElement("table");

  array.forEach( function (pic) {

    var a = document.createElement("a"),
      td = document.createElement("td"),

      img = document.createElement("img");

    if (rowMembers === cols) {
      table.appendChild(tr);
      tr = document.createElement("tr");
      rowMembers = 0;

    }

    img.src = "pics/0.png";

    a.onclick = function () {
      that.turnPic(this, pic);
    };
    a.href = "#";
    a.appendChild(img);
    td.appendChild(a);
    tr.appendChild(td);
    rowMembers += 1;

  });

  return table;
};


Memory.prototype.resetImages = function (pic) {

  console.log(this);
  this.getTurnedPics().forEach(function (pic) { pic.img.src = "pics/0.png"; });
};
