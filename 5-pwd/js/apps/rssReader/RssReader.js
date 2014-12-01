"use strict";

/*global PWD */

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


};
