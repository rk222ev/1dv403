/*global PWD, document */
"use strict";

PWD.Window = function (app, id) {

  this.getId = function () {
    console.log(PWD.desktop.openWindows.indexOf(this.node)); return PWD.desktop.openWindows.indexOf(this.node); };

  this.width = 500;
  this.height = 400;

  this.position = {x: 50, y: 100};

  this.node = PWD.Window.prototype.createWindowNode();


  this.init();
};



PWD.Window.prototype.createWindowList = function () {
  var div = document.createElement("div"),
    closeButton = document.createElement("img"),
    closeLink = document.createElement("a");

  closeButton.setAttribute("src", "pics/icons/clear.svg");
  closeButton.classList.add("close-button");

  closeLink.setAttribute("href", "#");
  closeLink.appendChild(closeButton);

  div.appendChild(closeLink);

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
  var windowDiv = document.createElement("div"),
    resizeDiv = document.createElement("div");

  windowDiv.classList.add("window");
  windowDiv.appendChild(this.createWindowList());

  resizeDiv.classList.add("resize-div");

  windowDiv.appendChild(resizeDiv);

  return windowDiv;

};


PWD.Window.prototype.closeWindow = function (node) {

  PWD.desktop.node.removeChild(node);
  PWD.desktop.openWindows.splice(node, 1);

};
