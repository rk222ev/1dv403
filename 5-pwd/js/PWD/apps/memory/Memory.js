"use strict";


/*global document, window, RandomGenerator */
define(["jquery", "require", "mustache", "./random"], function ($, require, Mustache, random) {

  var Win = require("pwd/window/window");

  var Memory = function (id) {

    var that            = this,
        cols            = 4,
        rows            = 4,
        pictures        = [],
        turnedPics      = [],
        appSettings     = {},
        windowSettings  = {},
        numberOfTries   = 0,
        possibleMatches = (function () { return cols * rows / 2; })(),
        node;

    this.win = new Win(id);


    appSettings.picFolder = "js/PWD/apps/memory/pics/";

    this.win.icons.app        = "pics/icons/Memory.svg";
    this.win.titlebarText = "Memory 0.2";
    this.win.width        = 200;
    this.win.height       = 200;

    this.getColumns     = function () { return cols; };
    this.setColumns     = function (c) { cols = c; }
    this.setRows        = function (r) {rows = r; };
    this.getId          = function () { return id; };
    this.getTurnedPics  = function () { return turnedPics; };
    this.getTries       = function () { return numberOfTries / 2; };
    this.setPicAsTurned = function (pic) { turnedPics.push(pic); };
    this.clearTurned    = function () { turnedPics = []; };
    this.getPicFolder      = (function () { return appSettings.picFolder; })();

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


    this.getPictureLink = function (img) {
      var windowNode = document.getElementById(this.getId());
      var images = windowNode.querySelectorAll(".app img");
      var index = Array.prototype.indexOf.call(images, img);

      return this.getPicFolder + pictures[index] + ".png";
    };

    this.run = function () {
      pictures = random({rows: rows, cols: cols});
      this.buildBoard(pictures);
      this.win.setAsLoaded();
    };
  };


  Memory.prototype.settings = {
    "Nytt spel": function (game) { game.run(); },

    "Inställningar": function (app) {
      $.get(require.toUrl('apps/memory/tpl/settings.mst'), function(template) {
        var winId = app.win.getId();

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".ok-button").bind("mousedown", function () {
          var size = winNode.find(".interval-value").val().split(",");
          app.setColumns(Number(size[0]));
          app.setRows(Number(size[1]));
          app.run();
          winNode.find(".modal").remove();
        });
      });
    },
  };


  Memory.prototype.buildBoard = function (pics) {

    var gameNode  = $('#' + this.getId() + ' ' + '.app'),
        newBoard  = document.createElement("div"),
        game      = this.generateTable(pics, this.getColumns());

    newBoard.classList.add("board");
    newBoard.appendChild(game);

    gameNode.html(newBoard);
  };



  Memory.prototype.generateTable = function (picArray, cols) {

    var that        = this,
        rowMembers  = 0,
        tr          = document.createElement("tr"),
        table       = document.createElement("table");

    // For each member in picArray create a cell containing a
    // a href and an image. Append this to the current table row.
    // If the table row cells then matches the cols parameter in members
    // Add the row to the table.
    picArray.forEach( function (pic) {

      var a   = document.createElement("a"),
          td  = document.createElement("td"),
          img = document.createElement("img");

      img.src = that.getPicFolder + "0.png";

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

    table.addEventListener("mousedown", function (e) {
     that.clickEvent(e);
    }, true);

    return table;
  };



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


  Memory.prototype.checkMatch = function () {
    var that = this,
        pics = this.getTurnedPics();

      if (pics[0].src === pics[1].src) {
        this.addMatch();
        this.clearTurned();

      } else {
       window.setTimeout(function () { that.resetGuess(that.getTurnedPics()); }, 1000);

      }

  };


  Memory.prototype.resetGuess = function (pics) {
    var that = this;

    pics.forEach( function (pic) {
      pic.setAttribute("src", that.getPicFolder + "0.png");

    });

    this.clearTurned();
  };



  Memory.prototype.victory = function () {
    var windowNode = document.getElementById(this.getId()),
        div = windowNode.querySelector('.board'),
        replacement = document.createElement("div"),
        p = document.createElement("p");

    p.innerHTML = "Grattis du vann! Det tog dig " + this.getTries() + " försök.";

    replacement.appendChild(p);
    replacement.classList.add("board");

    div.parentNode.replaceChild(replacement, div);
  };

  return Memory;

});
