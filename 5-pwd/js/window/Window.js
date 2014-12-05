"use strict";

/*global PWD, document */

PWD.Window = function (params) {
  var id = params.id;

  var windowSettings = {
    id:           params.id,
    icon:         params.icon,
    title:        params.titleBarText || "app",

    closeIcon:    "pics/icons/clear.svg",
    maximizeIcon: "pics/icons/chevron-up.svg",
    minimizeIcon: "pics/icons/chevron-down.svg"
  };

  this.width = params.width || 500;
  this.height = params.height || 400;

  this.position = {
    x: 50,
    y: 10
  };

  this.node = this.createWindowNode(windowSettings);

  this.init();
};


 PWD.Window.prototype.appLoaded = function () {
    var node = this.node.querySelector(".statusbar img");
    node.parentNode.removeChild(node);
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


PWD.Window.prototype.createWindowNode = function (params) {
  var windowId      = params.id,
      windowIcon    = params.icon,
      windowTitle   = params.title,
      closeIcon     = params.closeIcon,
      maxIcon       = params.maximizeIcon,

      closeButton   = PWD.Window.prototype.elements.button(closeIcon, "close-button"),
      contentDiv    = PWD.Window.prototype.elements.div("app"),
      listDiv       = PWD.Window.prototype.elements.div("window-list"),
      listIcon      = PWD.Window.prototype.elements.listIcon(windowIcon),
      maximize      = PWD.Window.prototype.elements.button(maxIcon, "maximize-button"),
      resizeDiv     = PWD.Window.prototype.elements.div("resize-div"),
      statusBar     = PWD.Window.prototype.elements.div("statusbar"),
      windowDiv     = PWD.Window.prototype.elements.window(windowId),
      windowName    = PWD.Window.prototype.elements.listText(windowTitle),

      loadingImage  = document.createElement("img");

  loadingImage.setAttribute("src", "pics/ajax-loader.gif");

  // Builds the window list.
  listDiv.appendChild(listIcon);
  listDiv.appendChild(windowName);
  listDiv.appendChild(closeButton);
  listDiv.appendChild(maximize);

  // Builds the window.
  windowDiv.appendChild(listDiv);
  windowDiv.appendChild(contentDiv);
  statusBar.appendChild(loadingImage);
  windowDiv.appendChild(statusBar);
  windowDiv.appendChild(resizeDiv);

  return windowDiv;

};


PWD.Window.prototype.closeWindow = function (node) {

  PWD.desktop.node.removeChild(node);
  delete PWD.desktop.openWindows[node.id];
};