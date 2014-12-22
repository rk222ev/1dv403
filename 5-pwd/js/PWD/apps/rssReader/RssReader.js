"use strict";


define(["jquery", "mustache", "require"], function ($, Mustache, require) {

  var Window = require("pwd/window/window");

  var RssReader = function (id) {

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
  RssReader.prototype.setUrl = function (url) {
    this.win.url = "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape(url);
  };


  /*
  A list of settings for the app-settingsmenu.
  The key is the setting name and the value is the function that is
  to be run when the setting is clicked.
  */
  RssReader.prototype.settings = {

    'Uppdateringsintervall': function (process) {
      var that = this;
      var winId = process.id;

      $.get(require.toUrl('apps/rssReader/tpl/interval.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".ok-button").bind("mousedown", function () {
          process.updateFreq = Number(winNode.find(".interval-value").val());
          process.setInterval(process);
          winNode.find(".modal").remove();
        });

      });
    },

    'Välj källa': function (process) {
      var winId = process.id;

      $.get(require.toUrl('apps/rssReader/tpl/sources.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".ok-button").bind("mousedown", function () {
          var source =  winNode.find(".custom-source").val() || winNode.find("input:checked").val()
          process.setUrl(source);
          process.run(process.id);
          winNode.find(".modal").remove();
        });

      });
    },

    'Uppdatera nu': function (process) {
      process.run(process.id);
    },

  };

  RssReader.prototype.setInterval = function (process) {

    window.clearInterval(process.interval);
    // The anonymous function make this point to the correct this.
    process.interval = window.setInterval(function () { return process.run(process.id); }, process.updateFreq);
  };

  RssReader.prototype.run = function () {
    var that = this;
    var date = new Date();
    var windowId = this.win.getId();

    this.win.setAsLoading();

    if (this.interval === undefined) {
      this.interval = window.setInterval(function () { that.run(windowId); }, this.updateFreq);
    }

    this.win.setStatusbarText("Senast uppdaterat: " + date.toLocaleTimeString());
    $.get(this.win.url, function (data) {

      $('#' + windowId + ' .app').html(data);
        that.win.setAsLoaded();
   });
  };


  return RssReader;
});