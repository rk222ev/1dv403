/*global PWD, document */
"use strict";

PWD.Window = function (app, id) {


  this.width = 500;
  this.height = 400;
  this.position = {x: 50, y: 100};

  this.node = PWD.Window.prototype.createWindowNode();


  this.init();
};



PWD.Window.prototype.buildList = function () {
  var div = document.createElement("div");
  div.classList.add("window-list");

  return div;
};




PWD.Window.prototype.init = function () {
  PWD.desktop.node.appendChild(this.node);
  this.setSize();

  this.setPosition();
};


PWD.Window.prototype.setSize = function () {
  this.node.style.width = this.width + "px";
  this.node.style.height = this.height + "px";
};


PWD.Window.prototype.setPosition = function () {
  this.node.style.top = this.position.x + "px";
  this.node.style.left = this.position.y + "px";

};


PWD.Window.prototype.createWindowNode = function () {
  var windowDiv = document.createElement("div");

  windowDiv.classList.add("window");
  windowDiv.appendChild(this.buildList());

  return windowDiv;

};
