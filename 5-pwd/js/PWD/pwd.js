"use strict";


define(
  [
    "jquery", // v-2.1.1 ATM
    "require",
    "mustache",
    "pwd/helper/settings",
    "pwd/window/handlers",
    "pwd/window/window",
    "apps/imageViewer/ImageViewer",
    "apps/rssReader/RssReader",
    "apps/memory/Memory",
    "apps/labbyMezzage/labbyMezzage",
    "apps/mdn/mdn",
  ],

  function ($, require, Mustache, settings, handlers) {
    (function () {

      var apps = {};
      var pwdNode = document.querySelector('.pwd');

      pwdNode.style.width = settings.width + 'px';
      pwdNode.style.height = settings.height + 'px';

      // Add all apps to be loaded to the desktop.
      apps.ImageViewer = require("apps/imageViewer/ImageViewer");
      apps.Memory = require("apps/memory/Memory");
      apps.RssReader = require("apps/rssReader/RssReader");
      apps.LabbyMezzage = require("apps/labbyMezzage/labbyMezzage");
      apps.Mdn = require("apps/mdn/mdn");

      // Loops through all our apps.
      // Assigns apropriatehandlers.
      Object.keys(apps).forEach(function (app) {
        var icon = $('<a href="#">');
        var img = $('<img class="launcher">');

        img.attr("src", "pics/icons/" + app + ".svg");
        img.appendTo(icon);

        icon.click(function (e) { handlers.openWindow(apps[app]); } );

        icon.appendTo(".pwd");

      });
    }());

  }
);


