/*global document, window */
"use strict";


var PWD = {
  desktop: {},
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

  link.setAttribute("href", "#");
  link.appendChild(appIcon);


  return link;
};


PWD.desktop.clickEvent = function (e) {
  var theEvent = e;

  e.preventDefault();

  if (e.target.className === "launcher") {

    PWD.desktop.openWindows.push(new PWD.Window());

  } else if (e.target.className === "close-button") {
    // TODO: Find a better way to do this...
      PWD.Window.prototype.closeWindow(e.target.parentNode.parentNode.parentNode);

  } else if (e.target.className === "window-list") {
    // PWD.desktop.node.addEventListener("mouseup", PWD.desktop.stopMouseMove);
    PWD.desktop.dragWindow(e);

  }
};

PWD.desktop.dragWindow = function (e) {
  var windowNode = e.target.parentNode;

      PWD.desktop.node.addEventListener("mousemove", PWD.desktop.mouseMove);
      PWD.desktop.node.addEventListener("mouseup", PWD.desktop.stopMouseMove);

};

PWD.desktop.mouseMove = function (e) {
  var movedWindow;

  PWD.desktop.openWindows.forEach(function (win) {
    if (win.node === e.target.parentNode) {
      movedWindow = win;
    }

    win = PWD.desktop.openWindows[0];

    win.position.x += e.movementX;
    win.position.y += e.movementY;
    win.setPosition();
  });


};

PWD.desktop.stopMouseMove = function (e) {
  PWD.desktop.node.removeEventListener("mousemove", PWD.desktop.mouseMove);
  PWD.desktop.node.removeEventListener("mouseup", PWD.desktop.stopMouseMove);
};



PWD.desktop.node = document.querySelector(".pwd");
PWD.desktop.openWindows = [];


window.onload = function () {
  PWD.desktop.init();
  // PWD.openWindows.push(new PWD.Window());

};