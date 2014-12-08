"use strict";

/*global PWD, document */

PWD.Window = function (params) {
  var id = params.id;

  this.settings = {
    id:           params.id,
    icon:         params.icon,
    title:        params.titleBarText || "app",

    closeIcon:    "pics/icons/clear.svg",
    maximizeIcon: "pics/icons/chevron-up.svg",
    minimizeIcon: "pics/icons/chevron-down.svg"
  };

  this.width = params.width || 500;
  this.height = params.height || 400;
  this.maximized = false;

  this.position = {
    x: 50,
    y: 10
  };

  this.node = this.createWindowNode(this.settings);

  this.init();
};


PWD.Window.prototype.init = function () {
  var numberOfOpenWindows = Object.keys(PWD.desktop.openWindows).length,
      yOffset = numberOfOpenWindows * 5,
      xOffset  = numberOfOpenWindows * 5;


  this.position.x += xOffset % (900 - this.width);
  this.position.y += yOffset % (620 - this.height);
  
  this.node.style.top     = this.position.y + "px";
  this.node.style.left    = this.position.x + "px";
  this.node.style.width   = this.width      + "px";
  this.node.style.height  = this.height     + "px";

  PWD.desktop.node.appendChild(this.node);
};


PWD.Window.prototype.filterSize = function (value, secondValue, min, max) {
  var newValue = value  + secondValue || secondValue;

  if (newValue > max) {
    newValue = max;
  } else if (newValue < min) {
    newValue = min;
  }

  return newValue || value;

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


