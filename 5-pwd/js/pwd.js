/*global document, window */
"use strict";


var PWD = {
  desktop: {
    openWindows: {},
    node: document.querySelector(".pwd"),
  },
  apps: {}
};


window.onload = function () {
  PWD.desktop.init();
  // PWD.openWindows.push(new PWD.Window());
  // var imageViewer = new PWD.apps.ImageViewer();

};