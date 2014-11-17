/*global document, window, Message*/

function MessageBoard (name, messages) {
  "use strict";

  this.messages = messages || [];

  this.node = (function () { return document.querySelector("#" + name); })();

  this.init();
}

// Clears the board by making a new empty node and replacing.
// the one that exists.
MessageBoard.prototype.clearMessages = function (board) {
  var element = board.querySelector(".messages-div");

  
  board.replaceChild(document.buildElement({
      element: "div",
      className: "messages-div"
  }), element);
};


// Creates the messageboard elements we will need
// this includes delete buttons and info buttons etc.
MessageBoard.prototype.init = function () {
  var that = this,
    mainNode = this.node;

  mainNode.appendChild(
    document.buildElement({
      element:"div",
      className: "messages-div"
    })
  );

  mainNode.appendChild(
    document.buildElement({
      element: "p",
      className: "info-amount-of-messages",
      innerHTML: "Antal meddelanden : " + this.messages.length
    })
  );

  mainNode.appendChild(
    document.buildElement({
      element: "textarea",
      className: "message-input",
    })
  );

  mainNode.appendChild(
    document.buildElement({
      element: "input",
      value: "skriv",
      type: "button",
      onclick: function () {
        that.sendMessage();
        return false;
      }
    })
  );

  mainNode.querySelector(".message-input").addEventListener("keydown", function (key) {
    if (key.keyCode === 13 && key.shiftKey === false) {
      key.preventDefault();
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
    wrapper = document.buildElement({
      element: "div",
      className: "message"
    }),
    footer = document.createElement("footer");

  if (Array.isArray(message)) {
    message.forEach(function (message) { that.renderMessage(message); });
    return;
  }


  footer.appendChild(document.buildElement({
    element: "p",
    innerHTML: message.getTime()
  }));

  footer.appendChild(document.buildElement({
    element: "img",
    src: "pics/i.png",
    onclick: function () {
      window.alert("Inlägget skapades " + message.getDate());
    }
  }));

  footer.appendChild(document.buildElement({
    element: "img",
    src: "pics/x.png",
    onclick: function () {
      if (window.confirm("Är du säker på att du vill radera meddelandet?")) {
        that.removeMessage(that.messages.indexOf(message));
      }
    }
  }));

  wrapper.appendChild(document.buildElement({
    element: "p",
    className: "message-text",
    innerHTML: message.getHTMLText()
  }));

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
