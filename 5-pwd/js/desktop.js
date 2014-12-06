"use strict";

/*global PWD, document */

PWD.desktop = {
  settings: { height: 640, width: 1024 },
  openWindows: {},
  events: {},
  node: document.querySelector(".pwd"),

  // Walks to DOM toward the HTML-element looking for a node
  // with a certain class.
  findParentNode: function (startingNode, className) {

    if(startingNode !== null  && typeof startingNode.classList === "object")  {

        if (startingNode.classList.contains(className)) {
          return startingNode;

        }
      return PWD.desktop.findParentNode(startingNode.parentNode, className);
    }
  },


  init: function () {

    PWD.desktop.node.addEventListener("mousedown", PWD.desktop.events.click);

    Object.keys(PWD.apps).forEach( function (key) {
      PWD.desktop.node.appendChild(PWD.desktop.createLauncher(key));

    });
  },


  setFocus: function (node) {
    PWD.desktop.node.removeChild(node);
    PWD.desktop.node.appendChild(node);
  },


  createLauncher: function (app) {
    var appIcon = document.createElement("img"),
      link = document.createElement("a");

    appIcon.setAttribute("src", "pics/icons/" + app + ".svg");
    appIcon.classList.add("launcher");
    appIcon.classList.add(app);

    link.setAttribute("href", "#");
    link.setAttribute("title", app);
    link.appendChild(appIcon);


    return link;
  }
};


PWD.desktop.events = {

  click: function (e) {
    var win = PWD.Window.prototype,
        windowNode,
        appNode;

    e.preventDefault();

    if (e.target.classList.contains("launcher") ) {
      var time = Date.now();
      var appName = e.target.classList[1];

     PWD.desktop.openWindows[time] = new PWD.apps[appName]({
      id: time
     });

    } else if (e.target.classList.contains("close-button")) {
      win.events.close(PWD.desktop.findParentNode(e.target, "window"));

    } else if (e.target.classList.contains("maximize-button")) {
      win.events.resize(PWD.desktop.findParentNode(e.target, "window"));

    } else if (e.target.classList.contains("resize-div")) {
      PWD.desktop.events.drag(PWD.desktop.findParentNode(e.target, "window"), "move");

    } else if (e.target.classList.contains("app")) {
      windowNode = PWD.desktop.findParentNode(e.target, "window");
      PWD.desktop.setFocus(windowNode);

    } else if (e.target.classList.contains("pwd") === false) {
      windowNode = PWD.desktop.findParentNode(e.target, "window");
      PWD.desktop.setFocus(windowNode);

      if (PWD.desktop.findParentNode(e.target, "window-list")) {
        PWD.desktop.events.drag(windowNode);
      }

    }

  },

  drag: function (targetWindowNode, property) {
    var mouseMove;

   var mouseUp = function () {
      PWD.desktop.node.removeEventListener("mousemove", mouseMove);
      PWD.desktop.node.removeEventListener("mouseup", mouseUp);

    };
    mouseMove = function (e) {
      if (property === "move") {
        PWD.Window.prototype.events.resize(targetWindowNode, e.movementX, e.movementY);

      } else {
        PWD.Window.prototype.events.position(PWD.desktop.openWindows[targetWindowNode.id],
          {x: e.movementX, y: e.movementY}
        );
       // PWD.desktop.openWindows[targetWindowNode.id].window.updatePosition(e.movementX, e.movementY);
      }
    };

    PWD.desktop.node.addEventListener("mousemove", mouseMove);
    PWD.desktop.node.addEventListener("mouseup", mouseUp);

  }
};
