/*global document, window, define, DOMParser, XMLHttpRequest */
"use strict";

define(["pwd/window/window"], function (Window) {

  function Mdn(id) {

    // Windowsettings
    this.win = new Window(id);
    this.win.icons.app = "pics/icons/Mdn.svg";
    this.win.titlebarText = "Mozilla Developer Network";

    this.url = "https://developer.mozilla.org/en-US/search";
  }

  Mdn.prototype.run = function () {
    var that = this,
        input = document.createElement("input");

    this.win.node = document.getElementById(this.win.getId());
    this.node = this.win.node.querySelector('.app');
    that.win.setAsLoaded();

    input.setAttribute("type", "text");
    input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        that.win.setAsLoading();
        that.search(that.node.querySelector("input").value);
      }
    });

    that.node.appendChild(input);
  };

  Mdn.prototype.search = function (text) {
    var that = this,
        xhr = new XMLHttpRequest();

    xhr.open('GET', this.url + "?q=" + text);

    xhr.onreadystatechange = function (e) {
      var links;

      if (xhr.readyState === 4 && xhr.status === 200) {

        var data = xhr.responseText,
            parser = new DOMParser(),
            doc = parser.parseFromString(xhr.responseText, "text/html"),
            search = doc.querySelector(".search-results-container");

        search.removeChild(search.querySelector(".search-results-more"));

        links = search.querySelectorAll("a");

        Array.prototype.forEach.call(links, function (link) {
          link.addEventListener("click", function (e) {
            linkClick(e, that.node);
          });
        });

        that.node.innerHTML = "";
        that.node.appendChild(search);
        that.win.setAsLoaded();
      }
    };

    xhr.send(null) ;
  };

  var linkClick = function (e, appNode) {
    var xhr = new XMLHttpRequest(),
        url = e.target.getAttribute("href");

    e.preventDefault();

    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
      var data, parser, doc, page;

      if (xhr.readyState === 4 && xhr.status === 200) {
        parser = new DOMParser();
        doc = parser.parseFromString(xhr.responseText, "text/html");
        page = doc.querySelector('#wikiArticle');

        appNode.innerHTML = "";
        appNode.appendChild(page);
      }
    };

    xhr.send(null);
  };

  return Mdn;
});
