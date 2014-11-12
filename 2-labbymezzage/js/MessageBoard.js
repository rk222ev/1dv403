/*global document, window, Message*/

function MessageBoard (name, messages) {
  "use strict";

  this.messages = messages || [];

  this.getName = function () { return name; };

  this.init();
}


MessageBoard.prototype.clearMessages = function (board) {
  var element = document.getNode(board, "messages-div");

  document.getNode(board).replaceChild(document.buildElement({
      element: "div",
      className: "messages-div"
  }), element);
};


MessageBoard.prototype.init = function () {
  var that = this;
    mainNode = document.getNode(this.getName());

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

document.getNode(this.getName(), "message-input").addEventListener("keydown", function (key) {
    if (key.keyCode === 13 && key.shiftKey === false) {
      key.preventDefault();
      that.sendMessage();
    }
  });

};


MessageBoard.prototype.removeMessage = function (pos) {

  this.messages.splice(pos, 1);
  this.clearMessages(this.getName());
  this.renderMessage(this.messages);
  this.updateMessageCounter(this.getName(), this.messages.length);
};

MessageBoard.prototype.renderMessage = function (message) {

  var that = this,
    messageArea = document.getNode(this.getName(), "messages-div"),
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


MessageBoard.prototype.sendMessage = function() {
  var textarea = document.getNode(this.getName(), "message-input"),
    newMessage = new Message(textarea.value, new Date());

  if (textarea.value !== "") {
    this.messages.push(newMessage);
    this.renderMessage(newMessage);
    textarea.value = "";
   this.updateMessageCounter(this.getName(), this.messages.length);
  }
};



MessageBoard.prototype.updateMessageCounter = function (name, numberOfMessages) {
  document.getNode(name, "info-amount-of-messages")
    .innerHTML = "Antal meddelanden : " + numberOfMessages;
};


// Builds an DOM node based on a object with certain keys.
document.buildElement = function (params) {

  if (params.hasOwnProperty("element")) {
    element = document.createElement(params.element);
  }

  if (params.hasOwnProperty("className")) {
    element.className = params.className;
  }

  if (params.hasOwnProperty("innerHTML")) {
    element.innerHTML = params.innerHTML;
  }

  if (params.hasOwnProperty("onclick")) {
    element.onclick = params.onclick;
  }

  if (params.hasOwnProperty("src")) {
    element.src = params.src;
  }

  if (params.hasOwnProperty("type")) {
    element.type = params.type;
  }

  if (params.hasOwnProperty("value")) {
    element.value = params.value;
  }

  return element;
};


// Gets DOM nodes based on id and class.
document.getNode =  function (element, className) {
  var boardNode =  document.getElementById(element);

  if(className === undefined)  {
    return boardNode;
  }

  return boardNode.getElementsByClassName(className)[0];
};


