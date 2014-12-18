"use strict";


define(["jquery", "mustache", "pwd/window/window"], function ($, Mustache) {

  var Window = require("pwd/window/window");

  var ImageViewer = function (id) {

     this.id = id;
     this.win = new Window(id);
     this.updateFreq = 60000;

    // Windowsettings.
    this.win.icons.app    = "pics/icons/RssReader.svg";
    this.win.titlebarText = "RssReader";
    this.win.width        =  400;
    this.win.height       =  600;

    this.setUrl("http://www.dn.se/m/rss/senaste-nytt");
  };

  // Sets the rss-feed URL
  ImageViewer.prototype.setUrl = function (url) {
    this.win.url = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape(url);
  };


  /*
  A list of settings for the app-settingsmenu.
  The key is the setting name and the value is the function that is
  to be run when the setting is clicked.
  */
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

    'Välj källa': function (process) {
      var winId = process.id;

      $.get(require.toUrl('apps/imageViewer/tpl/sources.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".cancel-button").bind("mousedown", function () {
          winNode.find(".modal").remove();
        });

        winNode.find(".ok-button").bind("mousedown", function () {
          process.setUrl(winNode.find("input:checked").val());
          process.run(process.id);
        });

      });
    },

    'Uppdatera nu': function (process) {
      process.run(process.id);
    },

  };

  ImageViewer.prototype.setInterval = function (process) {

    window.clearInterval(process.interval);
    // The anonymous function make this point to the correct this.
    process.interval = window.setInterval(function () { return process.run(process.id); }, process.updateFreq);
  };

  ImageViewer.prototype.run = function (windowId) {
    var that = this;
    var date = new Date();

    if (this.interval === undefined) {
      this.interval = window.setInterval(function () { that.run(windowId); }, this.updateFreq);
    }
    this.win.setStatusbarText("Senast uppdaterat: " + date.toLocaleTimeString());
    $.get(this.win.url, function (data) {

      $('#' + windowId + ' .app').html(data);
      $('#' + windowId + ' .app-status-icon').attr('src', that.win.icons.placeholder);
   });
  };


  return ImageViewer;
});