"use strict";

/*global document, window, define, require, DOMParser, XMLHttpRequest */

define([
	"mustache",
	"pwd/window/window",
	"./message" ,
	"pwd/helper/utils"
], function (Mustache, Window, Message, utils) {

	var LabbyMezzage = function (id) {
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
		this.interval = null;
		this.messages = "" ;
		this.url = {
			get: "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=",
			post: "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php",
		};
	};

	LabbyMezzage.prototype.run = function () {
		var that = this;

		this.win.node = document.getElementById(that.win.getId());
		this.node = this.win.node.querySelector('.app');
		this.getMessages();

		utils.getTemplate('apps/labbyMezzage/tpl/board.mst', function (template) {
			var rendered = Mustache.render(template, {});
			that.node.innerHTML = rendered;

			that.node.querySelector(".message-input").addEventListener("keydown", function (e) {
				var textNode = that.node.querySelector(".message-input");

				if(e.keyCode === 13 && e.shiftKey === false && textNode.value !== "") {
					e.preventDefault();
					that.sendMessage(textNode.value);
					textNode.value = "";
					that.getMessages();

				}
			});
			that.win.setAsLoaded();

			});

		 if (this.interval !== null) {
				window.clearInterval(this.interval);
			}

			document.cookie = "labby-interval=" + this.updateInterval;

			this.interval = window.setInterval(function () { that.getMessages();}, that.updateInterval);
	};

	LabbyMezzage.prototype.settings = {

		"Uppdateringsintervall": function (app) {
			utils.getTemplate('apps/labbyMezzage/tpl/settings/interval.mst', function(template) {
				var intervalSeconds = app.updateInterval / 1000,
					rendered = Mustache.render(template, {interval: app.updateInterval, seconds: intervalSeconds});

				app.node.appendChild(utils.templateParser(rendered, "modal"));

				app.node.querySelector(".ok-button").addEventListener("mousedown", function () {
					app.updateInterval = Number(app.node.querySelector(".interval-value").value);
					app.node.querySelector(".modal").remove();
				});
			});
		},

		"Alias": function (app) {
			utils.getTemplate('apps/labbyMezzage/tpl/settings/alias.mst', function(template) {

				var rendered = Mustache.render(template, {user: app.user});

				app.node.appendChild(utils.templateParser(rendered));

				app.node.querySelector(".ok-button").addEventListener("mousedown", function () {
					app.user = app.node.querySelector(".alias").value;
					document.cookie = "labby-alias=" + app.user;
					app.node.querySelector(".modal").remove();
				});

			});
		},
		"Antal meddelanden": function (app) {
			utils.getTemplate('apps/labbyMezzage/tpl/settings/amountofmessages.mst', function(template) {

				var rendered = Mustache.render(template, {history: app.history});

				app.node.appendChild(utils.templateParser(rendered));

				app.node.querySelector(".ok-button").addEventListener("mousedown", function () {
					app.history = app.node.querySelector(".labby-message-count").value;
					document.cookie = "labby-history=" + app.history;
					app.node.querySelector(".modal").remove();
					app.getMessages();
				});
			});
		},

		"Uppdatera nu": function (app) { app.getMessages(); }
	};

	LabbyMezzage.prototype.getMessages = function () {
		var xhr = new XMLHttpRequest();
		var that = this;
		var msgs;

		xhr.open('GET', this.url.get + this.history || 10);

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
		var parser = new DOMParser(),
			doc = parser.parseFromString(xml, "application/xml"),
			domMsgs = doc.querySelectorAll("message");


		var msgs = Array.prototype.map.call(domMsgs, function (msg) {
		 var m = new Message();

		 m.setText(msg.querySelector("text").textContent);
		 m.setDate(msg.querySelector("time").textContent);
		 m.setAuthor(msg.querySelector("author").textContent);

		 return m;
		});

		return msgs;
	};

	LabbyMezzage.prototype.renderMessage = function (message) {
		var that = this,
			messageNode = this.node.querySelector(".messages-div");

		if (Array.isArray(message)) {
			messageNode.innerHTML = "";
			message.forEach(function (message) { that.renderMessage(message); });
			return;
		}

		utils.getTemplate('apps/labbyMezzage/tpl/message.mst', function (template) {

			var rendered = Mustache.render(template, {
				author: message.getAuthor(),
				time: message.getDate(),
				text: message.getText(),
			});

			messageNode.insertBefore(utils.templateParser(rendered), messageNode.firstChild);
		});
	};

	LabbyMezzage.prototype.sendMessage = function (text) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', this.url.post);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("username=" + this.user + "&text=" + text);
		this.getMessages();
	};

	return LabbyMezzage;
});
