"use strict";

/*global document, PWD, XMLHttpRequest */

define(["require", "pwd/window/handlers"], function (require, handler) {

  var Window = require("pwd/window/window");

  var ImageViewer = function (id, params) {

    var appSettings = {},
        picData;

    this.url =  "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

    this.win = new Window(id);

    this.win.icons.app   = "pics/icons/ImageViewer.svg";
    this.win.titlebarText = "ImageViewer";
    this.win.width        =   params && params.width || 600;
    this.win.height       =   params && params.height || 460;
    this.win.node         = document.getElementById('#', id);

    this.setPicData = function (data) { this.picData = data; };
    this.getId = function () { return id; };
    this.getPicData = function () { return this.picData; };

    this.XHR    = new XMLHttpRequest();

  };


  ImageViewer.prototype.getGalleryJson = function (url) {
    var that = this;

      this.XHR.onload = function () {
        that.parseJson(that.XHR);
      };

      this.XHR.open("GET", url);
      this.XHR.send();

  };

  ImageViewer.prototype.setAppLoaded = function () {
    this.drawPics();
    this.win.setAsLoaded();

  };


  ImageViewer.prototype.click = function (e, pic) {
    var appParams = {};

     e.cancelBubble = true;

    appParams.picUrl = pic.URL;
    appParams.height = pic.height + 50;
    appParams.width = pic.width + 20;

    var winSelector;
    var windowNode;

    handler.openWindow(ImageViewer, appParams);

  };


  ImageViewer.prototype.drawPics = function () {
    var windowNode = document.getElementById(this.getId()),
        appNode = windowNode.querySelector('.app'),
        picData = this.getPicData(),
        newDiv = document.createElement("div"),
        widths = picData.map(function (pic) { return pic.thumbWidth; }),
        heights = picData.map(function (pic) { return pic.thumbHeight; }),
        maxWidth =  Math.max.apply(null, widths),
        maxHeight = Math.max.apply(null, heights);


    picData.forEach( function (pic) {
      var that = this,
          div = document.createElement("div"),
          a = document.createElement("a"),
          img = document.createElement("img");


      img.setAttribute("src", pic.thumbURL);
      a.appendChild(img);

      a.setAttribute("href", "#");
      div.appendChild(a);

      div.classList.add("gallery-pic");
      div.style.width = maxWidth + "px";
      div.style.height = maxHeight + "px";
      div.addEventListener("mousedown", function (e) {
        ImageViewer.prototype.click(e, pic);
      });

      newDiv.appendChild(div);
    });

    appNode.appendChild(newDiv);
  };



  ImageViewer.prototype.parseJson = function (data) {

    var pics;

    if (data.readyState === 4) {

      if (data.status === 200) {

        pics = JSON.parse(data.responseText).map(function (pic) { return pic; });

        this.setPicData(pics);
        this.setAppLoaded();
      }
    }
  };

  ImageViewer.prototype.getPic = function (url) {
    var img = document.createElement("img") ;
    var node = document.getElementById(this.getId());

    this.win.setAsLoaded();
    img.setAttribute("src", url);
    node.querySelector('.app').appendChild(img);
  };


  ImageViewer.prototype.run = function (params) {

    if (params) {
      this.getPic(params.picUrl);
    } else {
      this.getGalleryJson(this.url);
    }

  };

  return ImageViewer;

});


