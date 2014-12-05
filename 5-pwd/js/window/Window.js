"use strict";

/*global PWD, document */

PWD.Window = function (params) {
  var id = params.id;

  this.width = params.width || 500;
  this.height = params.height || 400;

  this.getIcon = function () { return params.icon; };
  this.getId = function () { return id; };
  this.getTitleBarText = function () { return params.titleBarText || "app"; };

  this.position = {
    x: 50,
    y: 10};

  this.node = this.createWindowNode();

  this.init();
};


 PWD.Window.prototype.appLoaded = function () {
    var node = this.node.querySelector(".statusbar img");
    node.parentNode.removeChild(node);
  };


PWD.Window.prototype.createWindowList = function () {
  var div           = PWD.Window.prototype.elements.div("window-list"),
      icon          = PWD.Window.prototype.elements.windowListIcon(this.getIcon()),
      windowName    = PWD.Window.prototype.elements.windowListText(this.getTitleBarText()),
      closeButton   = PWD.Window.prototype.elements.windowCloseButton("pics/icons/clear.svg");

  div.appendChild(icon);
  div.appendChild(windowName);
  div.appendChild(closeButton);

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
  if (this.height > 620) { this.height = 620; }
  this.node.style.height = this.height + "px";
};


PWD.Window.prototype.updatePosition = function (x, y) {

  this.position.x = PWD.Window.prototype.filterSize(x, this.position.x, 0, (1024 - this.width));
  this.position.y = PWD.Window.prototype.filterSize(y, this.position.y,0, (640 - this.height));

  this.node.style.top =  this.position.y + "px";
  this.node.style.left = this.position.x + "px";

};

PWD.Window.prototype.filterSize = function (value, secondValue, min, max) {
  var newValue = value  + secondValue || secondValue;

  if (newValue > max) {
    newValue = max;
  } else if (newValue < min) {
    newValue = min;
  }

  return newValue;

};

PWD.Window.prototype.resizeWindow = function (x, y) {
  this.height = PWD.Window.prototype.filterSize(this.height, y, 200, (640 - this.position.y));
  this.width = PWD.Window.prototype.filterSize(this.width, x, 200, 1024 - this.position.x);

  this.node.style.height = this.height + "px";
  this.node.style.width = this.width + "px";

};


PWD.Window.prototype.createWindowNode = function () {
  var windowDiv = PWD.Window.prototype.elements.window(this.getId()),
    contentDiv = PWD.Window.prototype.elements.div("app"),
    statusBar = PWD.Window.prototype.elements.div("statusbar"),
    resizeDiv = PWD.Window.prototype.elements.div("resize-div"),
    loadingImage = document.createElement("img");

  // windowDiv.setAttribute("id", this.getId());
  // windowDiv.classList.add("window");
  windowDiv.appendChild(this.createWindowList());

  //contentDiv.classList.add("app");
  windowDiv.appendChild(contentDiv);

  loadingImage.setAttribute("src", "pics/ajax-loader.gif");

  statusBar.appendChild(loadingImage);
  //statusBar.classList.add("statusbar");
  windowDiv.appendChild(statusBar);

  //resizeDiv.classList.add("resize-div");
  windowDiv.appendChild(resizeDiv);

  return windowDiv;

};


PWD.Window.prototype.closeWindow = function (node) {

  PWD.desktop.node.removeChild(node);
  delete PWD.desktop.openWindows[node.id];
};