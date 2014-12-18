"use strict";


define(
  [
    "jquery", // v-2.1.1 ATM
    "require",
    "mustache",
    "apps/imageViewer/ImageViewer",
    "apps/rssReader/RssReader",
    "apps/memory/Memory",
  ],

  function ($, require, Mustache) {
    (function () {

      var apps = {};
      var process = {};
      var caughtWindow;


      // Add all apps to be loaded to the desktop.
      apps.ImageViewer = require("apps/imageViewer/ImageViewer");
      apps.Memory = require("apps/memory/Memory");
      apps.RssReader = require("apps/rssReader/RssReader");


      // Loops through all our apps.
      // Assigns apropriatehandlers.
      Object.keys(apps).forEach(function (app) {
        var icon = $('<a href="#">');
        var img = $('<img class="launcher">');

        img.attr("src", "pics/icons/" + app + ".svg");
        img.appendTo(icon);

        icon.click(function (e) { openWindow(app); } );

        icon.appendTo(".pwd");

      });


      var dragWindow = function (e) {
        var id = caughtWindow;
        var object = process[id];
        var node = $("#" + id);

        var x = (e.clientX - object.win.caughtX);
        var y = (e.clientY - object.win.caughtY);

        object.win.setPosition(x, y);
        object.win.caughtX = e.clientX;
        object.win.caughtY = e.clientY;

      };

      var resizeWindow = function (e) {
        var id = caughtWindow;
        var object = process[id];
        var node = $("#" + id);

        object.win.width += (e.clientX- object.win.caughtX);
        object.win.height += (e.clientY- object.win.caughtY);

        node.css('width', object.win.width+ 'px');
        node.css('height', object.win.height + 'px');

        object.win.caughtX = e.clientX;
        object.win.caughtY = e.clientY;
      };

      var releaseWindow = function (e) {
        $('.pwd').unbind("mousemove");
        e.target.removeEventListener("mouseup", releaseWindow);
      };

      var click = function (e) {
        var proc = process[e.currentTarget.id];
        var node = $('#' + e.currentTarget.id);

        caughtWindow = e.currentTarget.id; // Saves a app glbal reference to the window id.

        proc.win.caughtX = e.clientX;
        proc.win.caughtY = e.clientY;

        // Send the window node to the top
        if (node.is(":last-child") === false) {
          $('.pwd').append(node);
        }

        if (node.find('.window-settings').hasClass("hidden") === false) {
          node.find('.window-settings').toggleClass("hidden");
        }

        if (e.target.classList.contains("window-list")) {
          $('.pwd').bind("mousemove", dragWindow);

        } else if (e.target.classList.contains("resize-div")) {
          $('.pwd').bind("mousemove", resizeWindow);

        } else if (e.target.classList.contains("close-button")) {
          //if (process.interval) {
            window.clearInterval(proc.interval);
          //}
          node.remove();
          delete process[e.currentTarget.id];

        } else if (e.target.classList.contains("maximize-button")) {
          console.log("maximize");

        } else if (e.target.classList.contains("settings-button")) {
          node.find('.window-settings').toggleClass("hidden");

        } else if (e.target.classList.contains("window-setting")) {
          proc.settings[$(e.target).text()](process[e.currentTarget.id]);
        }
      };


      var openWindow = function (app) {
        var winSelector;
        var windowNode;

        $.get(require.toUrl('./window/tpl/window.mst'), function(template) {
          var id = Date.now();
          process[id] = new apps[app](id);

          winSelector = '#' + id + ' ';

          var rendered = Mustache.render(template, {ID: id, settings: process[id].win});
          $('.pwd').append(rendered);
          $('.pwd').bind("mouseup", releaseWindow);
          $('#' + id).bind("mousedown", click);

          if (process[id].settings) {
            $('#' + id + ' .settings-link').toggleClass("hidden");

            Object.keys(process[id].settings).forEach(function (setting) {
              $('#' + id + ' ' + '.window-settings').append($('<li class="window-setting">' + setting + '</li>'));
            });

          }

          process[id].run(id);
        });

      };

    }());

  }
);


