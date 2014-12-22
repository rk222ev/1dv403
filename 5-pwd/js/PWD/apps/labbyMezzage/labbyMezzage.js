/*global document, window, define */
"use strict";

define(["require", "mustache", "pwd/window/window","./message" ], function (require, Mustache, Window, Message) {

  function LabbyMezzage (id) {
    var that = this;
    var labbyCookies = {};

    // Ugly solution to get all cookie keys containing the word "labby"
    document.cookie.split(";").forEach(function (c) {
      var params = c.split("=");
      if(params[0].indexOf("labby") !== -1) {
        labbyCookies[params[0].trim()] = params[1];
      }
    });
    this.win = new Window(id);
    this.win.icons.app = "pics/icons/LabbyMezzage.svg";
    this.win.titlebarText = "LabbyMezzage";

    this.user = labbyCookies["labby-alias"] || "Anonymous";
    this.history = labbyCookies["labby-history"] || 10;
    this.updateInterval = labbyCookies["labby-interval"] || 10000;
    this.interval = window.setInterval(function () { that.getMessages();}, that.updateInterval);

    this.messages = "" ;
    this.url = {
      get: "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + this.history,
      post: "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php",
    };
    this.messageTpl = null;
  }

  LabbyMezzage.prototype.run = function () {
    var that = this,
      windowNode = document.getElementById(this.win.getId()),
      appNode = windowNode.querySelector('.app');

      var xhr = new XMLHttpRequest();
      xhr.open('GET', require.toUrl('apps/labbyMezzage/tpl/board.mst'));

      xhr.onreadystatechange = function () {
        var rendered;
        if (xhr.readyState === 4 && xhr.status === 200) {
          rendered = Mustache.render(xhr.responseText, {});
          appNode.innerHTML = rendered;

          appNode.querySelector(".message-input").addEventListener("keydown", function (e) {
            var textNode = appNode.querySelector(".message-input");

            if(e.keyCode === 13 && e.shiftKey === false && textNode.value !== "") {
              e.preventDefault();
              that.sendMessage(textNode.value);
              textNode.value = "";

            }
          });

          that.getMessages();
          that.win.setAsLoaded();
        }
      };

      xhr.send(null);
  };


  LabbyMezzage.prototype.settings = {
    "Uppdateringsintervall": function (app) {
      var winId = app.win.getId();

      $.get(require.toUrl('apps/rssReader/tpl/sources.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".cancel-button").bind("mousedown", function () {
          winNode.find(".modal").remove();
        });

        winNode.find(".ok-button").bind("mousedown", function () {
          app.setUrl(winNode.find("input:checked").val());
          app.run(app.id);
        });

      });
    },
    "Alias": function (app) {
      var winId = app.win.getId();

      $.get(require.toUrl('apps/labbyMezzage/tpl/settings/alias.mst'), function(template) {

        var rendered = Mustache.render(template, {user: app.user});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".ok-button").bind("mousedown", function () {
          app.user = winNode.find(".alias").val();
          document.cookie = "labby-alias=" + app.user;
          winNode.find(".modal").remove();
        });

      });
    },
    "Antal meddelanden": function (app) {
      var winId = app.win.getId();

      $.get(require.toUrl('apps/rssReader/tpl/sources.mst'), function(template) {

        var rendered = Mustache.render(template, {});
        var winNode = $('#' + winId + ' .app');
        winNode.append(rendered);

        winNode.find(".cancel-button").bind("mousedown", function () {
          winNode.find(".modal").remove();
        });

        winNode.find(".ok-button").bind("mousedown", function () {
          app.setUrl(winNode.find("input:checked").val());
          app.run(app.id);
        });

      });
    },
    "Uppdatera nu": function (app) { app.getMessages(); },
  };


  LabbyMezzage.prototype.getMessages = function () {
    var xhr = new XMLHttpRequest();
    var that = this;
    var msgs;

    xhr.open('GET', this.url.get);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {

        if (xhr.responseText !== that.messages) {
          msgs = that.drawMessages(xhr.responseText);
          that.renderMessage(msgs);
          that.messages = xhr.responseText;
        }
      }
    };

    xhr.send(null);

  };


  LabbyMezzage.prototype.drawMessages = function (xml) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xml, "application/xml");
    var domMsgs = doc.querySelectorAll("message");


    var msgs = Array.prototype.map.call(domMsgs, function (msg) {
     var m = new Message();

     m.setText(msg.querySelector("text").innerHTML);
     m.setDate(msg.querySelector("time").innerHTML);
     m.setAuthor(msg.querySelector("author").innerHTML);

     return m;

    });

    return msgs;

  };


  LabbyMezzage.prototype.renderMessage = function (message) {
    var that = this;
    var windowNode = document.getElementById(this.win.getId());
    var messageNode = windowNode.querySelector(".messages-div");

    if (Array.isArray(message)) {
      message.forEach(function (message) { that.renderMessage(message); });
      return;
    }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', require.toUrl('apps/labbyMezzage/tpl/message.mst'));

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var rendered = Mustache.render(xhr.responseText, {
            author: message.getAuthor(),
            time: message.getDate(),
            text: message.getText(),
          });
          var div = document.createElement("div");
          div.classList.add("message");
          div.innerHTML = rendered;

          messageNode.insertBefore(div, messageNode.firstChild);
        }
      };

      xhr.send(null);

  };

  LabbyMezzage.prototype.sendMessage = function (text) {
    var xhr = new XMLHttpRequest();


    xhr.open('POST', this.url.post);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("username=" + this.user + "&text=" + text);


  };

  return LabbyMezzage;


});