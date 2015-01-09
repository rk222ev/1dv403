"use strict";

/* global define, document, window */


define(
  [
    "jquery", // v-2.1.1 ATM
    "require",
    "mustache",
  ],

  function ($, require, Mustache) {

    var handlers = {};

    handlers.dragWindow = function (e, obj) {
      var id = obj.win.getId();
      var node = $("#" + id);

      var x = (e.clientX - obj.win.caughtX);
      var y = (e.clientY - obj.win.caughtY);

      document.querySelector(".pwd").classList.add("drag");

      obj.win.setPosition(x, y);
      obj.win.caughtX = e.clientX;
      obj.win.caughtY = e.clientY;

    };

    handlers.resizeWindow = function (e, obj) {
      var id = obj.win.getId();
      var node = $("#" + id);

      document.querySelector(".pwd").classList.add("drag");

      obj.win.width += (e.clientX- obj.win.caughtX);
      obj.win.height += (e.clientY- obj.win.caughtY);

      if (obj.win.width < 320) {
        obj.win.width = 320;
      }

      if (obj.win.height < 230) {
        obj.win.height = 230;
      }

      node.css('width', obj.win.width+ 'px');
      node.css('height', obj.win.height + 'px');

      obj.win.caughtX = e.clientX;
      obj.win.caughtY = e.clientY;
    };

    handlers.releaseWindow = function (e) {
      $('.pwd').unbind("mousemove");
      e.target.removeEventListener("mouseup", handlers.releaseWindow);
      document.querySelector(".pwd").classList.remove("drag");
    };

    handlers.click = function (e, obj) {
      var node = $('#' + obj.win.getId()),
          appNode,
          scroll;
      obj.win.caughtX = e.clientX;
      obj.win.caughtY = e.clientY;

      // Send the window node to the top
      if (node.is(":last-child") === false) {
        scroll = obj.node.scrollTop;
        $('.pwd').append(node);
        obj.node.scrollTop = scroll;
      }

      if (node.find('.window-settings').hasClass("hidden") === false) {
        node.find('.window-settings').toggleClass("hidden");
      }

      if (e.target.classList.contains("window-list")) {
        $('.pwd').bind("mousemove", function (e) { handlers.dragWindow(e, obj); });

      } else if (e.target.classList.contains("resize-div")) {
        $('.pwd').bind("mousemove", function (e) { handlers.resizeWindow(e, obj); });

      } else if (e.target.classList.contains("close-button")) {
        window.clearInterval(obj.interval);
        node.remove();

      } else if (e.target.classList.contains("maximize-button")) {
        obj.win.toggleFullscreen(obj);

      } else if (e.target.classList.contains("settings-button")) {
        node.find('.window-settings').toggleClass("hidden");

      } else if (e.target.classList.contains("window-setting")) {
        obj.settings[$(e.target).text()](obj);
      }
    };

    handlers.openWindow = function (App, params) {
      var winSelector;
      var windowNode;

      $.get(require.toUrl('./tpl/window.mst'), function(template) {
        var id = Date.now();
        var process = {};
        var Constructor = App;

        process = new Constructor(id, params);

        winSelector = '#' + id + ' ';

        var rendered = Mustache.render(template, {ID: id, settings: process.win});
        $('.pwd').append(rendered);
        $('.pwd').bind("mouseup", handlers.releaseWindow);
        $('#' + id).bind("mousedown", function (e) { handlers.click(e, process); });

        if (process.settings) {
          $('#' + id + ' .settings-link').toggleClass("hidden");

          Object.keys(process.settings).forEach(function (setting) {
            $('#' + id + ' ' + '.window-settings').append($('<li class="window-setting">' + setting + '</li>'));
          });

        }

        process.win.setOpeningPosition();
        process.run(params);
      });

    };
    return handlers;
  }
);


