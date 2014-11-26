/*global PWD, document */
"use strict";

PWD.Window = function (id, app) {

  this.getId = function () { return id; };
  this.width = 500;
  this.height = 400;

  this.getAppName = function () { return app; };

  this.app = (function () { return new PWD.apps[app](); })();

  this.position = {
    x: 50,
    y: 10};

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
  windowName.innerHTML = windowName.innerHTML[0].toUpperCase() + windowName.innerHTML.substr(1);
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

  this.position.x += Object.keys(PWD.desktop.openWindows).length % 23 * 20;

  this.position.y += Object.keys(PWD.desktop.openWindows).length % 13 * 20;

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

PWD.Window.prototype.filterSize = function (value, secondValue, min, max) {
  var newValue = value + secondValue;

  if (newValue > max) {
    newValue = max;
  } else if (newValue < min) {
    newValue = min;
  }

  return newValue;

};

PWD.Window.prototype.resizeWindow = function (x, y) {
  this.height = PWD.Window.prototype.filterSize(this.height, y, 50, (640 - this.position.y));
  this.width = PWD.Window.prototype.filterSize(this.width, x, 100, 1024 - this.position.x);

  this.node.style.height = this.height + "px";
  this.node.style.width = this.width + "px";

};


PWD.Window.prototype.createWindowNode = function () {
  var windowDiv = document.createElement("div"),
    statusBar = document.createElement("div"),
    resizeDiv = document.createElement("div");

  windowDiv.setAttribute("id", this.getId());
  windowDiv.classList.add("window");
  windowDiv.appendChild(this.createWindowList());

  statusBar.classList.add("statusbar");
  windowDiv.appendChild(statusBar);

  resizeDiv.classList.add("resize-div");
  windowDiv.appendChild(resizeDiv);

  return windowDiv;

};


PWD.Window.prototype.closeWindow = function (node) {

  PWD.desktop.node.removeChild(node);
  delete PWD.desktop.openWindows[node.id];
};
