"use strict";


var PWD = {
  desktop: {}
};


// Initializes the desktop
PWD.desktop.init = function () {

  this.node = document.querySelector(".pwd");

  PWD.desktop.node.appendChild(this.createLauncher("images"));
};


// Creates launchers that goes to the launcher bar.
PWD.desktop.createLauncher = function (app) {
  var appIcon = document.createElement("img"),
    link = document.createElement("a");

  appIcon.setAttribute("src", "pics/icons/" + app + ".svg");
  appIcon.classList.add("icon");

  link.setAttribute("href", "#");
  link.appendChild(appIcon);

  return link;
};


window.onload = function () {
  PWD.desktop.init();

};