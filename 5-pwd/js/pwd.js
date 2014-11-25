/*global document, window */
"use strict";


var PWD = {
  desktop: {},
};


// Initializes the desktop
PWD.desktop.init = function () {

  PWD.desktop.node.addEventListener("click", PWD.desktop.clickEvent);
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

  console.log(e.target);

  e.preventDefault();

  if (e.target.className === "launcher") {

    PWD.desktop.openWindows.push(new PWD.Window());

  } else if (e.target.className === "close-button") {
    // TODO: Find a better way to do this...
      PWD.Window.prototype.closeWindow(e.target.parentNode.parentNode.parentNode);
  }
};



PWD.desktop.node = document.querySelector(".pwd");
PWD.desktop.openWindows = [];


window.onload = function () {
  PWD.desktop.init();
  // PWD.openWindows.push(new PWD.Window());

};