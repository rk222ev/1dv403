/*global PWD, document */
"use strict";



// Initializes the desktop
PWD.desktop.init = function () {

  PWD.desktop.node.addEventListener("mousedown", PWD.desktop.clickEvent);
  // PWD.desktop.node.appendChild(this.createLauncher("images"));


  Object.keys(PWD.apps).forEach( function (key) {
    PWD.desktop.node.appendChild(PWD.desktop.createLauncher(key));
  });

};

// Creates launchers that goes to the launcher bar.
PWD.desktop.createLauncher = function (app) {
  var appIcon = document.createElement("img"),
    link = document.createElement("a");

  appIcon.setAttribute("src", "pics/icons/" + app + ".svg");
  appIcon.classList.add("launcher");
  appIcon.classList.add(app);

  link.setAttribute("href", "#");
  link.setAttribute("title", app);
  link.appendChild(appIcon);


  return link;
};


// Handles all clickevents on the desktop.
// including inside windows.
PWD.desktop.clickEvent = function (e) {
  var windowNode;

  e.preventDefault();

  if (e.target.classList.contains("launcher") ) {
    var time = new Date().getTime();
    var app = e.target.classList[1];

   PWD.desktop.openWindows[time] = new PWD.Window(time, app);

  } else if (e.target.classList.contains("close-button")) {
    PWD.Window.prototype.closeWindow(PWD.desktop.findParentNode(e.target, "window"));

  } else if (e.target.classList.contains("resize-div")) {
    PWD.desktop.dragWindow(PWD.desktop.findParentNode(e.target, "window"), "move");

  } else if (e.target.classList.contains("pwd") === false) {
    windowNode = PWD.desktop.findParentNode(e.target, "window");
    PWD.desktop.setFocus(windowNode);

    if (PWD.desktop.findParentNode(e.target, "window-list")) {
      PWD.desktop.dragWindow(windowNode.id);
    }

  }

};

// Walks to DOM toward the HTML-element looking for a node
// with a certain class.
PWD.desktop.findParentNode = function (startingNode, className) {
  if (startingNode.classList.contains(className)) {
    return startingNode;
  }

  return PWD.desktop.findParentNode(startingNode.parentNode, className);
};



PWD.desktop.dragWindow = function (targetNode, property) {
  var mouseMove;

 var mouseUp = function () {
    PWD.desktop.node.removeEventListener("mousemove", mouseMove);
    PWD.desktop.node.removeEventListener("mouseup", mouseUp);

  };

  mouseMove = function (e) {
    if (property === "move") {
      PWD.desktop.openWindows[targetNode.id].resizeWindow(e.movementX, e.movementY);
    } else {
      PWD.desktop.openWindows[targetNode].updatePosition(e.movementX, e.movementY);
    }
  };

  PWD.desktop.node.addEventListener("mousemove", mouseMove);
  PWD.desktop.node.addEventListener("mouseup", mouseUp);

};


PWD.desktop.setFocus = function (selectedNode) {
  PWD.desktop.node.removeChild(PWD.desktop.openWindows[selectedNode.id].node);
  PWD.desktop.node.appendChild(PWD.desktop.openWindows[selectedNode.id].node);
};
