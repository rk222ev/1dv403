/*global PWD, document */
"use strict";

PWD.desktop = {
  openWindows: {},
  events: {},
  node: document.querySelector(".pwd"),

  // Walks to DOM toward the HTML-element looking for a node
  // with a certain class.
  findParentNode: function (startingNode, className) {
    if (startingNode.classList && startingNode.classList.contains(className)) {
      return startingNode;
    }

    return PWD.desktop.findParentNode(startingNode.parentNode, className);
  },


  init: function () {

    PWD.desktop.node.addEventListener("mousedown", PWD.desktop.events.click);

    Object.keys(PWD.apps).forEach( function (key) {
      PWD.desktop.node.appendChild(PWD.desktop.createLauncher(key));

    });
  },


  setFocus: function (selectedNode) {
    PWD.desktop.node.removeChild(selectedNode);
    PWD.desktop.node.appendChild(selectedNode);
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



PWD.desktop.events.click = function (e) {
  var windowNode;

  e.preventDefault();

  if (e.target.classList.contains("launcher") ) {
    var time = new Date().getTime();
    var appName = e.target.classList[1];

   PWD.desktop.openWindows[time] = new PWD.apps[appName]({
    id: time
   });

  } else if (e.target.classList.contains("close-button")) {
    PWD.Window.prototype.closeWindow(PWD.desktop.findParentNode(e.target, "window"));

  } else if (e.target.classList.contains("resize-div")) {
    PWD.desktop.events.drag(PWD.desktop.findParentNode(e.target, "window"), "move");

  } else if (e.target.classList.contains("pwd") === false) {
    windowNode = PWD.desktop.findParentNode(e.target, "window");
    PWD.desktop.setFocus(windowNode);

    if (PWD.desktop.findParentNode(e.target, "window-list")) {
      PWD.desktop.events.drag(windowNode);
    }

  }

};

PWD.desktop.events.drag = function (targetWindowNode, property) {
  var mouseMove;

 var mouseUp = function () {
    PWD.desktop.node.removeEventListener("mousemove", mouseMove);
    PWD.desktop.node.removeEventListener("mouseup", mouseUp);

  };
  mouseMove = function (e) {
    if (property === "move") {
      PWD.desktop.openWindows[targetWindowNode.id].window.resizeWindow(e.movementX, e.movementY);
    } else {
      PWD.desktop.openWindows[targetWindowNode.id].window.updatePosition(e.movementX, e.movementY);
    }
  };

  PWD.desktop.node.addEventListener("mousemove", mouseMove);
  PWD.desktop.node.addEventListener("mouseup", mouseUp);

};

