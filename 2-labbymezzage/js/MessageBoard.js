/*global document, window, Message, artoo*/

function MessageBoard (name) {
  "use strict";

  var that = this;

  function removeMessage (pos) {
    that.messages.splice(pos, 1);
    MessageBoard.prototype.clearMessages(name);
    renderMessage(that.messages);
    MessageBoard.prototype.updateMessageCounter(name, that.messages.length);
  }

  function renderMessage (message) {
    if (Array.isArray(message)) {
      message.forEach(function (message) { renderMessage(message); });
      return;
    }

    var messageArea = document.getNode(name, "messages-div"),
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
          removeMessage(that.messages.indexOf(message));
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
  }


  function sendMessage () {
    var textarea = document.getNode(name, "message-input"),
      newMessage = new Message(textarea.value, new Date());

    if (textarea.value !== "") {
      that.messages.push(newMessage);
      renderMessage(newMessage);
      textarea.value = "";
      MessageBoard.prototype.updateMessageCounter(name, that.messages.length);
    }
  }

  this.init = function () {
    var mainNode = document.getNode(name);
    that.messages = [];

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
          sendMessage();
          return false;
        }
      })
    );

    document.getNode(name, "message-input").addEventListener("keydown", function (key) {
      if (key.keyCode === 13 && key.shiftKey === false) {
        key.preventDefault();
        sendMessage();
      }
    });
  };
}

MessageBoard.prototype.clearMessages = function (board) {
  var element = document.getNode(board, "messages-div");

  document.getNode(board).replaceChild(document.buildElement({
      element: "div",
      className: "messages-div"
  }), element);
};

MessageBoard.prototype.updateMessageCounter = function (name, length) {
  document.getNode(name, "info-amount-of-messages")
    .innerHTML = "Antal meddelanden : " + length;
};
