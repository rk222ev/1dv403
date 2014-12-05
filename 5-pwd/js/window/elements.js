"use strict";

/*global document, PWD */

PWD.Window.prototype.elements = {

  window: function (id) {
    var div = document.createElement("div");

    div.setAttribute("id", id);
    div.classList.add("window");

    return div;
  },


  div: function (className) {
    var div = document.createElement("div");

    div.classList.add(className);

    return div;
  },

  windowListIcon: function (URL) {
    var img = document.createElement("img");

    img.setAttribute("src", URL);
    img.classList.add("app-icon");

    return img;

  },

  windowListText: function (text) {
    var span = document.createElement("span");

    span.innerHTML = text[0].toUpperCase() + text.substr(1);
    return span;
  },

  button: function (URL, className) {
    var a   = document.createElement("a"),
        img = document.createElement("img");

    img.setAttribute("src", URL);
    img.classList.add(className);

    a.setAttribute("href", "");
    a.appendChild(img);

    return a;
  },

};