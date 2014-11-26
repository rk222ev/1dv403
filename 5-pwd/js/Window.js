/*global PWD, document */
"use strict";

PWD.Window = function (id, app) {

  this.getId = function () { return id; };
  this.width = 500;
  this.height = 400;

  this.getAppName = function () { return app; };

  this.position = {x: 50, y: 100};

  this.node = this.createWindowNode();


  this.init();
};



PWD.Window.prototype.createWindowList = function () {
  var div = document.createElement("div"),
    icon = document.createElement("img"),
    windowName = document.createElement("span"),
    closeButton = document.createElement("img"),
    closeLink = document.createElement("a");

  icon.setAttribute("src", "pics/icons/" + this.getAppName() + ".svg");
  icon.classList.add("app-icon");
  div.appendChild(icon);

  windowName.innerHTML = this.getAppName();
  div.appendChild(windowName),

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
    newX = this.position.x += (x || 0),
    maxY = 640 - this.height,
    maxX = 1024 - this.width;


  if (newX < 0) {
    newX = 0;
  } else if (newX > maxX) {
    newX = maxX;

  }

  if (newY < 0) {
    newY = 0;
  } else if (newY > maxY) {
    newY = maxY;
  }

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
