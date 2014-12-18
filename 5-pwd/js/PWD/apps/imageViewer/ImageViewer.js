"use strict";

/*global document, PWD, XMLHttpRequest */
define(["jquery", "mustache", "pwd/window/window"], function ($, Mustache) {

  var Window = require("pwd/window/window");

  var ImageViewer = function (id, url) {

    var appSettings     = {},
        picData;

    this.url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

    this.win = new Window(id);

    // windowSettings.id           = id;
    this.win.icons.app   = "pics/icons/ImageViewer.svg";
    this.win.titlebarText = "ImageViewer";
    this.win.width        =  600;
    this.win.height       =  460;
    this.win.node         = document.getElementById('#', id);

    this.setPicData = function (data) { this.picData = data; };
    this.getId = function () { return id; };
    this.getPicData = function () { return this.picData; };


    //this.window = new PWD.Window(windowSettings);
    this.XHR    = new XMLHttpRequest();

    /*this.init({
      jsonUrl: appSettings.Url,
      picUrl: url
    });
*/
  };


  ImageViewer.prototype.getGalleryJson = function (url) {
    var that = this;

      this.XHR.onreadystatechange = function () {
        that.parseJson(that.XHR);
      };

      this.XHR.open("GET", url);
      this.XHR.send();

  };

  ImageViewer.prototype.setAppLoaded = function () {
    //PWD.Window.prototype.events.appLoaded(this.window.node);
    this.drawPics();

  };


  ImageViewer.prototype.click = function (e, pic) {
    var settings = {};

     e.cancelBubble = true;

    settings.id = Date.now();
    settings.picUrl = pic.URL;
    settings.height = pic.height + 50;
    settings.width = pic.width + 20;

    var winSelector;
    var windowNode;

    $.get(require.toUrl('pwd/window/tpl/window.mst'), function(template) {
      var id = Date.now();
      var imageWindow = new ImageViewer(id);
      winSelector = '#' + id + ' ';

      var rendered = Mustache.render(template, {ID: id, settings: imageWindow.win});
      $('.pwd').append(rendered);

      imageWindow[id].run(id);
    });
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

  ImageViewer.prototype.drawPic = function (url) {
    var img = document.createElement("img") ;

    img.setAttribute("src", url);
    this.win.node.appendChild(img);
  };


  ImageViewer.prototype.run = function (params) {
      //this.drawPic(this.url);
      //PWD.Window.prototype.events.appLoaded(this.window.node);
      this.getGalleryJson(this.url);

  };

  return ImageViewer;

});


