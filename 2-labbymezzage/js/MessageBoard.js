/*global document, window, Message*/
"use strict";

function MessageBoard (name, messages) {

  this.messages = messages || [];

  this.node = (function () { return document.querySelector("#" + name); })();

  this.init();
}


MessageBoard.prototype.clearMessages = function (board) {
  var element = board.querySelector(".messages-div"),
    newBoard = document.createElement("div");

  newBoard.classList.add("messages-div");

  board.replaceChild(newBoard, element);
};


// Creates the messageboard elements we will need
// this includes delete buttons and info buttons etc.
MessageBoard.prototype.init = function () {
  var that = this,
    mainNode = this.node,
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
    if (e.keyIdentifier === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      that.sendMessage();
    }
  });

};

// Removes a message at a certain index in the array and also
// makes renderMessage() reprint the remaining messages.
// Lastly it updates the message counter.
MessageBoard.prototype.removeMessage = function (pos) {

  this.messages.splice(pos, 1);
  this.clearMessages(this.node);
  this.renderMessage(this.messages);
  this.updateMessageCounter();
};


// Renders messages and prints this to our HTML doc.
// if the input is a array of messages it calls itself
// recursively and renders each message.
MessageBoard.prototype.renderMessage = function (message) {

  var that = this,
    messageArea = this.node.querySelector(".messages-div"),
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

  infoImg.setAttribute("src", "pics/i.png");
  infoImg.addEventListener("click", function () {
      window.alert("Inlägget skapades " + message.getDate());
  });
  footer.appendChild(infoImg);

  delImg.setAttribute("src", "pics/x.png");
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

// Creates a new message from the textarea value,
// adds this to messages[],
// prints the message by calling printMessage
// and updates the message counter.
MessageBoard.prototype.sendMessage = function() {
  var textarea = this.node.querySelector(".message-input"),
    newMessage = new Message(textarea.value, new Date());

  if (textarea.value !== "") {
    this.messages.push(newMessage);
    this.renderMessage(newMessage);
    textarea.value = "";
   this.updateMessageCounter();
  }
};



MessageBoard.prototype.updateMessageCounter = function () {
  this.node.querySelector(".info-amount-of-messages")
    .innerHTML = "Antal meddelanden : " + this.messages.length;
};
