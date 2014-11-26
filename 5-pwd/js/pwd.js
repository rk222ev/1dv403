/*global document, window */
"use strict";


var PWD = {
  desktop: {
    openWindows: {},
    node: document.querySelector(".pwd")
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
    var app = e.target.classList[1];

   PWD.desktop.openWindows[time] = new PWD.Window(time, app);

  } else if (e.target.className === "close-button") {
    // TODO: Find a better way to do this...
      PWD.Window.prototype.closeWindow(e.target.parentNode.parentNode.parentNode);

  } else if (e.target.className === "window-list") {
    PWD.desktop.setFocus(e.target.parentNode.id);
    PWD.desktop.dragWindow(e.target.parentNode.id);

  } else if (e.target.className === "resize-div") {
    PWD.desktop.dragWindow(e.target.parentNode.id, "move");

  }
};



PWD.desktop.dragWindow = function (target, property) {
  var mouseMove;

 var mouseUp = function () {
    PWD.desktop.node.removeEventListener("mousemove", mouseMove);
    PWD.desktop.node.removeEventListener("mouseup", mouseUp);

  };

  mouseMove = function (e) {
    if (property === "move") {
      PWD.desktop.openWindows[target].resizeWindow(e.movementX, e.movementY);
    } else {
      PWD.desktop.openWindows[target].updatePosition(e.movementX, e.movementY);
    }
  };

  PWD.desktop.node.addEventListener("mousemove", mouseMove);
  PWD.desktop.node.addEventListener("mouseup", mouseUp);

};


PWD.desktop.setFocus = function (nodeID) {
  PWD.desktop.node.removeChild(PWD.desktop.openWindows[nodeID].node);
  PWD.desktop.node.appendChild(PWD.desktop.openWindows[nodeID].node);
};

window.onload = function () {
  PWD.desktop.init();
  // PWD.openWindows.push(new PWD.Window());

};