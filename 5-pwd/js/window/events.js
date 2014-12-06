"use strict";

/*global PWD, document */


PWD.Window.prototype.events = {

  appLoaded: function (node) {
    var icon = node.querySelector(".statusbar img");

    icon.setAttribute("src", "");
  },

  close: function (node) {

    PWD.desktop.node.removeChild(node);
    delete PWD.desktop.openWindows[node.id];
  },

  resize: function (node, x, y) {
    var win = PWD.desktop.openWindows[node.id].window;

    if (x === undefined || y === undefined) {
      win.node.style.top = 0;
      win.node.style.left = 0;
      win.node.style.height = "100%";
      win.node.style.width = "100%";

    } else {
      win.height = PWD.Window.prototype.filterSize(win.height, y, 200, (640 - win.position.y));
      win.width = PWD.Window.prototype.filterSize(win.width, x, 200, 1024 - win.position.x);

      win.node.style.height = win.height + "px";
      win.node.style.width = win.width + "px";
    }
  },

  position: function (app, pos) {
    app.window.position.x += pos.x;
    app.window.position.y += pos.y;

    app.window.node.style.left  = app.window.position.x + "px";
    app.window.node.style.top   = app.window.position.y + "px";
  }

};
