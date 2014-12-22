/*global document, window, define */
"use strict";

define(["require", "pwd/window/window","./message" ], function (require, Window, Message) {

  function LabbyMezzage (id) {
    var history = 10;
    this.win = new Window(id);

    this.messages = [];
    this.url = {
      get: "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + history,
      post: "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php",
    };
  }


  LabbyMezzage.prototype.clearMessages = function () {
    var element = this.node.querySelector(".messages-div"),
      newBoard = document.createElement("div");

    newBoard.classList.add("messages-div");

    this.node.replaceChild(newBoard, element);
  };


  // Creates the messageboard elements we will need
  // this includes delete buttons and info buttons etc.
  LabbyMezzage.prototype.run = function () {
    var that = this,
      windowNode = document.getElementById(this.win.getId()),
      mainNode = windowNode.querySelector('.app'),
      messagesDiv = document.createElement("div"),
      p = document.createElement("p"),
      txtArea = document.createElement("textarea"),
      input = document.createElement("input");

    messagesDiv.classList.add("messages-div");
    mainNode.appendChild(messagesDiv);

    p.classList.add("info-amount-of-messages");
    p.innerHTML = "Antal meddelanden : " + this.messages.length;
    mainNode.appendChild(p);

    txtArea.classList.add("message-input");
    mainNode.appendChild(txtArea);

    input.setAttribute("value", "skriv");
    input.setAttribute("type", "button");
    input.setAttribute("click", this.sendMessage);
    mainNode.appendChild(input);

    mainNode.querySelector(".message-input").addEventListener("keydown", function (e) {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        that.sendMessage();
      }
    });

    this.getMessages();

  };


  LabbyMezzage.prototype.getMessages = function () {
    var xhr = new XMLHttpRequest();
    var that = this;
    var msgs;

    xhr.open('GET', this.url.get);

    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        msgs = that.drawMessages(xhr.responseText);
        that.renderMessage(msgs);
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


  LabbyMezzage.prototype.removeMessage = function (pos) {

    this.messages.splice(pos, 1);
    this.clearMessages();
    this.renderMessage(this.messages);
    this.updateMessageCounter();
  };


  // Renders messages and prints this to our HTML doc.
  // if the input is a array of messages it calls itself
  // recursively and renders each message.
  LabbyMezzage.prototype.renderMessage = function (message) {

    var that = this,
      windowNode = document.getElementById(this.win.getId()),
      messageArea = windowNode.querySelector(".messages-div"),
      wrapper = document.createElement("div"),
      footer = document.createElement("footer"),
      msgP = document.createElement("p"),
      timeP = document.createElement("p"),
      infoImg = document.createElement("img"),
      delImg = document.createElement("img");



    if (Array.isArray(message)) {
      message.forEach(function (message) { that.renderMessage(message); });
      return;
    }


    timeP.innerHTML = message.getTime();
    footer.appendChild(timeP);

    infoImg.setAttribute("src", "pics/icons/clock.svg");
    infoImg.addEventListener("click", function () {
        window.alert("Inlägget skapades " + message.getDate());
    });
    footer.appendChild(infoImg);

    delImg.setAttribute("src", "pics/icons/clear.svg");
    delImg.addEventListener("click", function () {
        if (window.confirm("Är du säker på att du vill radera meddelandet?")) {
          that.removeMessage(that.messages.indexOf(message));
        }
      }
    );
    footer.appendChild(delImg);

    msgP.classList.add("message-text");
    msgP.innerHTML = message.getHTMLText();

    wrapper.classList.add("message");
    wrapper.appendChild(msgP);
    wrapper.appendChild(footer);

    messageArea.appendChild(wrapper);
  };


  LabbyMezzage.prototype.sendMessage = function() {
    var windowNode = document.getElementById(this.win.getId()),
      textarea = windowNode.querySelector(".message-input"),
      newMessage = new Message(textarea.value, new Date());

    if (textarea.value !== "") {
      this.messages.push(newMessage);
      this.renderMessage(newMessage);
      textarea.value = "";
     this.updateMessageCounter();
    }
  };



  LabbyMezzage.prototype.updateMessageCounter = function () {
    this.node.querySelector(".info-amount-of-messages")
      .innerHTML = "Antal meddelanden : " + this.messages.length;
  };


  return LabbyMezzage;


});
