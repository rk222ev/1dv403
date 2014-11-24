"use strict";

function Memory (cols, rows, nodeName, picsFolder) {

  var pictures = [],
    turnedPics = [],
    numberOfTries = 0,
    possibleMatches = (function () { return cols * rows / 2; })();

  // Gets assigned a reference to the game element node.
  this.node = document.querySelector("#" + nodeName); 

  this.addMatch = function () {
    possibleMatches -= 1;
    if (possibleMatches === 0) {
     this.victory();

    }
  };


  this.addTry = function () {
    numberOfTries += 1;

    if ( numberOfTries % 2 === 0) {
      this.checkMatch();
    }
  };

  this.clearTurned = function () { turnedPics = []; };

  this.picFolder = (function () { return picsFolder || "pics/"; })();

  this.getPictureLink = function (img) {

    var index = Array.prototype.indexOf.call(this.node.querySelectorAll("img"), img);

    return this.picFolder + pictures[index] + ".png";

  };

  this.getSize = function () { return { rows: rows, cols: cols }; };

  this.getTurnedPics = function () { return turnedPics; };

  this.getTries = function () { return numberOfTries / 2; };

  this.setPicAsTurned = function (pic) { turnedPics.push(pic); };


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

    img.src = that.picFolder + "0.png";

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
   that.clickEvent(e);
  });
  
  table.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      that.clickEvent(e);  
    }
    
  });

  return table;
};


// ********************************************
// Handles the event when a picture is clicked
// ********************************************
Memory.prototype.clickEvent = function (e) {
    var target = e.target,
    turned = this.getTurnedPics().length;
  

  // If target node is the a-element go to its firstChild.
  // Should move everything from the img-element to the a-element.
  if (target.tagName !== "IMG") {
    target = target.firstChild;
  }

  if (turned < 2 && target.tagName === "IMG" && target.src.indexOf("pics/0.png") !== -1) {
    this.setPicAsTurned(target);
    target.setAttribute("src", this.getPictureLink(target));
    this.addTry();

  }
};


Memory.prototype.checkMatch = function(first_argument) {
  var that = this,
    pics = this.getTurnedPics();

    if (pics[0].src === pics[1].src) {
      this.addMatch();
      this.clearTurned();

    } else {
     window.setTimeout(function () { that.noMatch(that.getTurnedPics()); }, 1000);

    }

};

//**********************************
// Resets the turned pics and
// clears the turned pictures array.
//**********************************
Memory.prototype.noMatch = function (pics) {
  var that = this;

  pics.forEach( function (pic) {
    pic.setAttribute("src", that.picFolder + "0.png");

  });

  this.clearTurned();
};



//**********************************
// Is called when all pics are
// matched.
//**********************************
Memory.prototype.victory = function() {
  var p = document.createElement("p");
  
  p.innerHTML = "Grattis du vann! Det tog dig " + this.getTries() + " försök.";
  this.node.appendChild(p);
};