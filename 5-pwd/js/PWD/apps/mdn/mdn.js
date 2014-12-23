/*global document, window, define */
"use strict";

define(["pwd/window/window"], function (Window) {

  function Mdn(id) {

    this.win = new Window(id);
    this.win.icons.app = "pics/icons/Mdn.svg";
    this.win.titlebarText = "Mozilla Developer Network";

    this.url = "https://developer.mozilla.org/en-US/search";

  }


  Mdn.prototype.run = function () {
    var that = this;
    var winNode = document.getElementById(this.win.getId());
    var input = document.createElement("input");

    that.win.setAsLoaded();

    input.setAttribute("type", "text");
    input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        that.win.setAsLoading();
        that.search(winNode.querySelector("input").value);
      }
    });

    winNode.querySelector('.app').appendChild(input);
  };


  Mdn.prototype.search = function (text) {
    var that = this;
    var xhr = new XMLHttpRequest();

    xhr.open('get', this.url + "?q=" + text);

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {

        var winNode = document.getElementById(that.win.getId());
        var appNode = winNode.querySelector('.app');
        var data = xhr.responseText;
        var parser = new DOMParser();
        var doc = parser.parseFromString(xhr.responseText, "text/html");
        var search = doc.querySelector(".search-results-container");

        search.removeChild(search.querySelector(".search-results-more"));

        appNode.innerHTML = "";
        appNode.appendChild(search);
        that.win.setAsLoaded();
      }
    };

    xhr.send(null) ;
  };


  return Mdn;
});
