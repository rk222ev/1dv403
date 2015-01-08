"use strict";


define(
  [
    "require",
    "mustache",
    "pwd/window/handlers",
    "pwd/window/window",
    "apps/imageViewer/ImageViewer",
    "apps/rssReader/RssReader",
    "apps/memory/Memory",
    "apps/labbyMezzage/labbyMezzage",
    "apps/mdn/mdn",
  ],

  function (require, Mustache, handlers) {
    (function () {

      var apps = {};
      var pwdNode = document.querySelector('.pwd');

      window.PWD = {};
      window.PWD.width = 1500;
      window.PWD.height = 640;

      pwdNode.style.width = window.PWD.width + 'px';
      pwdNode.style.height = window.PWD.height + 'px';


      // Add all apps to be loaded to the desktop.
      apps.ImageViewer = require("apps/imageViewer/ImageViewer");
      apps.Memory = require("apps/memory/Memory");
      apps.RssReader = require("apps/rssReader/RssReader");
      apps.LabbyMezzage = require("apps/labbyMezzage/labbyMezzage");
      apps.Mdn = require("apps/mdn/mdn");

      // Loops through all our apps.
      // Assigns apropriatehandlers.
      Object.keys(apps).forEach(function (app) {
        var icon = document.createElement('a'),
            img = document.createElement('img');

        icon.setAttribute('href', '#');
        img.classList.add('launcher');
        img.setAttribute('src', "pics/icons/" + app + ".svg");
        icon.appendChild(img);

        icon.addEventListener('click', function (e) { handlers.openWindow(apps[app]); } );

        document.querySelector('.pwd').appendChild(icon);
      });
    }());

  }
);


