/*global document, window */
"use strict";


var PWD = {
  desktop: {
  },
};


// Initializes the desktop
PWD.desktop.init = function () {

  PWD.desktop.node.addEventListener("mousedown", PWD.desktop.clickEvent);
  PWD.desktop.node.appendChild(this.createLauncher("images"));

};


// Creates launchers that goes to the launcher bar.
PWD.desktop.createLauncher = function (app) {
  var appIcon = document.createElement("img"),
    link = document.createElement("a");

  appIcon.setAttribute("src", "pics/icons/" + app + ".svg");
  appIcon.classList.add("launcher");
  appIcon.classList.add(app);

  link.setAttribute("href", "#");
  link.appendChild(appIcon);


  return link;
};


PWD.desktop.clickEvent = function (e) {

  e.preventDefault();

  if (e.target.classList.contains("window")) {
    PWD.desktop.setFocus(e.target.id);

  }

  if (e.target.classList.contains("launcher") ) {
    var time = new Date().getTime();

   PWD.desktop.openWindows[time] = new PWD.Window(time);

  } else if (e.target.className === "close-button") {
    // TODO: Find a better way to do this...
      PWD.Window.prototype.closeWindow(e.target.parentNode.parentNode.parentNode);

  } else if (e.target.className === "window-list") {
    PWD.desktop.setFocus(e.target.parentNode.id);
    PWD.desktop.dragWindow(e.target.parentNode.id);

  }
};

PWD.desktop.dragWindow = function (target) {
  var mouseMove = function (e) {
    PWD.desktop.openWindows[target].updatePosition(e.movementX, e.movementY);
  };

 var mouseUp = function () {
    PWD.desktop.node.removeEventListener("mousemove", mouseMove);
    PWD.desktop.node.removeEventListener("mouseup", mouseUp);

  };

  PWD.desktop.node.addEventListener("mousemove", mouseMove);
  PWD.desktop.node.addEventListener("mouseup", mouseUp);

};


PWD.desktop.node = document.querySelector(".pwd");

PWD.desktop.openWindows = {};

PWD.desktop.setFocus = function (nodeID) {
  PWD.desktop.node.removeChild(PWD.desktop.openWindows[nodeID].node);
  PWD.desktop.node.appendChild(PWD.desktop.openWindows[nodeID].node);
};

window.onload = function () {
  PWD.desktop.init();
  // PWD.openWindows.push(new PWD.Window());

};