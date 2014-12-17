"use strict";


define(["jquery", "mustache", "pwd/window/window"], function ($, Mustache) {

  var Window = require("pwd/window/window");

  var ImageViewer = function (id) {

     this.id = id;
     this.win = new Window();
     this.updateFreq = 2000;

    // Windowsettings.
    this.win.icons.app    = "pics/icons/RssReader.svg";
    this.win.titlebarText = "RssReader";
    this.win.width        =  400;
    this.win.height       =  600;
    this.win.url = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt");
  };

  ImageViewer.prototype.settings = {

    'Uppdateringsintervall': function (process) {
      var that = this;
      var winId = process.id;
      $.get(require.toUrl('apps/imageViewer/tpl/interval.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".cancel-button").bind("mousedown", function () {
          winNode.find(".modal").remove();
        });

        winNode.find(".ok-button").bind("mousedown", function () {
          process.updateFreq = Number(winNode.find(".interval-value").val());
          process.setInterval(process);
        });

      });
    },

    'Välj källa': function (winId) { console.log("välj källa"); },

    'Uppdatera nu': function (winId) { console.log("Uppdatera nu"); },
  };

  ImageViewer.prototype.setInterval = function (process) {

    window.clearInterval(process.interval);
    // The anonymous function make this point to the correct this.
    process.interval = window.setInterval(function () { return process.run(); }, process.updateFreq);
  };

  ImageViewer.prototype.run = function (windowId) {
    var that = this;

    if (this.interval === undefined) {
      this.interval = window.setInterval(function () { that.run(); }, 1000);
    }

    $.get(this.win.url, function (data) {
      $('#' + windowId + ' .app').html(data);
      $('#' + windowId + ' .app-status-icon').attr('src', that.win.icons.placeholder);
   });
  };


  return ImageViewer;
});