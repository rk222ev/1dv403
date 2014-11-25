/*global PWD, document */
"use strict";

PWD.Window = function (id) {

  this.getId = function () { return id; };
  this.width = 500;
  this.height = 400;

  this.position = {x: 50, y: 100};

  this.node = this.createWindowNode();


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

  this.updatePosition();
};


PWD.Window.prototype.setSize = function () {
  this.node.style.width = this.width + "px";
  this.node.style.height = this.height + "px";
};


PWD.Window.prototype.updatePosition = function (x, y) {
  var newY = this.position.y += (y || 0),
    newX = this.position.x += (x || 0);

  this.node.style.top =  newY + "px";
  this.node.style.left = newX + "px";

};


PWD.Window.prototype.createWindowNode = function () {
  var windowDiv = document.createElement("div"),
    resizeDiv = document.createElement("div");

  windowDiv.setAttribute("id", this.getId());
  windowDiv.classList.add("window");
  windowDiv.appendChild(this.createWindowList());

  resizeDiv.classList.add("resize-div");

  windowDiv.appendChild(resizeDiv);

  return windowDiv;

};


PWD.Window.prototype.closeWindow = function (node) {

  PWD.desktop.node.removeChild(node);
  delete PWD.desktop.openWindows[node.id];
};
