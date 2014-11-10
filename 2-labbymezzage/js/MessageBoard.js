/*global document, window, Message, artoo*/

function MessageBoard (name) {
  "use strict";

  var that = this;

  that.messages = [];

  that.getName = function () { return name; };

  that.getMessages = function () { return messages; };

  that.setMessages = function (msgs) { messages = msgs; };

  that.removeMessage = function (pos) {

    that.messages.splice(pos, 1);
    MessageBoard.prototype.clearMessages(name);
    MessageBoard.prototype.renderMessage(that.messages, that);
    MessageBoard.prototype.updateMessageCounter(name, that.messages.length);
  };

  MessageBoard.prototype.init(that);
}


MessageBoard.prototype.clearMessages = function (board) {
  var element = document.getNode(board, "messages-div");

  document.getNode(board).replaceChild(document.buildElement({
      element: "div",
      className: "messages-div"
  }), element);
};


MessageBoard.prototype.init = function (that) {
  var mainNode = document.getNode(that.getName());

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
      innerHTML: "Antal meddelanden : " + that.messages.length
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
        that.sendMessage(that);
        return false;
      }
    })
  );

document.getNode(that.getName(), "message-input").addEventListener("keydown", function (key) {
    if (key.keyCode === 13 && key.shiftKey === false) {
      key.preventDefault();
      that.sendMessage(that);
    }
  });
};


MessageBoard.prototype.renderMessage = function (message, that) {
  if (Array.isArray(message)) {
    message.forEach(function (message) { MessageBoard.prototype.renderMessage(message, that); });
    return;
  }

  var messageArea = document.getNode(that.getName(), "messages-div"),
    wrapper = document.buildElement({
      element: "div",
      className: "message"
    }),
    footer = document.createElement("footer");

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


MessageBoard.prototype.sendMessage = function(that) {
  var textarea = document.getNode(that.getName(), "message-input"),
    newMessage = new Message(textarea.value, new Date());

  if (textarea.value !== "") {
    that.messages.push(newMessage);
    that.renderMessage(newMessage, that);
    textarea.value = "";
    MessageBoard.prototype.updateMessageCounter(that.getName(), that.messages.length);
  }
};



MessageBoard.prototype.updateMessageCounter = function (name, length) {
  document.getNode(name, "info-amount-of-messages")
    .innerHTML = "Antal meddelanden : " + length;
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


