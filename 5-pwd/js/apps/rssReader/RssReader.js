"use strict";

/*global PWD, XMLHttpRequest, escape */

PWD.apps.RssReader = function (params) {

  var id              = params.id,
      appSettings     = {},
      windowSettings  = {},
      picData;


  windowSettings.id           = id;
  windowSettings.icon         = "pics/icons/RssReader.svg";
  windowSettings.titleBarText = "RssReader 0.1";
  windowSettings.width        = params.width || 400;
  windowSettings.height       = params.height || 600;


  this.window = new PWD.Window(windowSettings);
  this.node   = this.window.node.querySelector(".app");

  this.init();
};



PWD.apps.RssReader.prototype.init = function () {
  var that = this;
  var url = "//homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt");


  var XHR = new XMLHttpRequest();

  XHR.addEventListener("load", function () {
    that.node.innerHTML = XHR.response;
    PWD.Window.prototype.events.appLoaded(that.window.node);
  });
  XHR.open("GET", url);
  XHR.send();

};
