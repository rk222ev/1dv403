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


    if ((x === undefined || y === undefined) && win.maximized === false) {
      PWD.Window.prototype.events.maximize(win);

    } else {
      if (win.maximized === true) {
        PWD.Window.prototype.events.restoreSize(win);
      }

      win.height = PWD.Window.prototype.filterSize(win.height, y, 200, (640 - win.position.y));
      win.width = PWD.Window.prototype.filterSize(win.width, x, 200, 1024 - win.position.x);

      win.node.style.height = win.height + "px";
      win.node.style.width = win.width + "px";
    }
  },

  position: function (app, pos) {
    app.window.position.x += pos.x;
    app.window.position.y += pos.y;

    // Make sure the windows width is not outside of the desktop's "window".
    if (app.window.position.x < 0) {
      app.window.position.x = 0;

    } else if ((app.window.position.x + app.window.width) > PWD.desktop.settings.width) {
      app.window.position.x = PWD.desktop.settings.width - app.window.width;
    }

    // Make sure that the windows height is not outside of the desktop's "window".
    if (app.window.position.y < 0) {
      app.window.position.y = 0;

    } else if ((app.window.position.y + app.window.height) > PWD.desktop.settings.height) {
      app.window.position.y = PWD.desktop.settings.height - app.window.height;
    }


    app.window.node.style.left  = app.window.position.x + "px";
    app.window.node.style.top   = app.window.position.y + "px";
  },


  maximize: function (win) {
    var button = win.node.querySelector(".maximize-button");

    win.node.style.top = 0;
    win.node.style.left = 0;
    win.node.style.height = "100%";
    win.node.style.width = "100%";
    button.setAttribute("src", "pics/icons/chevron-down.svg");
    win.maximized = true;
  },


  restoreSize: function (win) {
    win.node.querySelector(".maximize-button").setAttribute("src", "pics/icons/chevron-up.svg");
    win.maximized = false;
  }
};
