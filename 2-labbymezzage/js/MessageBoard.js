/*global document, window, Message*/

function MessageBoard (name) {
    "use strict";

    var that = this,
      div = document.getElementById(name);

  // Clears the message Area
    this.clearMessages = function () {
      var element = MessageBoard.prototype.artoo.getNode(name, "messages-div");

      MessageBoard.prototype.artoo.getNode(name).replaceChild(MessageBoard.prototype.artoo.buildElement({
          element: "div",
          className: "messages-div"
      }), element);
    };

    this.removeMessage = function (pos) {
      that.messages.splice(pos, 1);
      that.clearMessages();
      that.renderMessage(that.messages);
      that.updateMessageCounter();
    };

    this.renderMessage = function (message) {
      if (Array.isArray(message)) {
        message.forEach(function (message) { that.renderMessage(message); });
        return;
      }

      var messageArea = MessageBoard.prototype.artoo.getNode(name, "messages-div"),

        wrapper = MessageBoard.prototype.artoo.buildElement({
          element: "div",
          className: "message"
        }),

        footer = document.createElement("footer");

      footer.appendChild(MessageBoard.prototype.artoo.buildElement({
        element: "p",
        innerHTML: message.getTime()
      }));

      footer.appendChild(MessageBoard.prototype.artoo.buildElement({
        element: "img",
        src: "pics/i.png",
        onclick: function () {
          window.alert("Inlägget skapades " + message.getDate());
        }
      }));

      footer.appendChild(MessageBoard.prototype.artoo.buildElement({
        element: "img",
        src: "pics/x.png",
        onclick: function () {
          if (window.confirm("Är du säker på att du vill radera meddelandet?")) {
            that.removeMessage(that.messages.indexOf(message));
          }
        }
      }));

      wrapper.appendChild(MessageBoard.prototype.artoo.buildElement({
        element: "p",
        className: "message-text",
        innerHTML: message.getHTMLText()
      }));

      wrapper.appendChild(footer);

      messageArea.appendChild(wrapper);
    };


    this.sendMessage = function () {
      var textarea = MessageBoard.prototype.artoo.getNode(name, "message-input"),
        newMessage = new Message(textarea.value, new Date());

      if (textarea.value !== "") {
        that.messages.push(newMessage);
        that.renderMessage(newMessage);
        textarea.value = "";
        that.updateMessageCounter();
      }
    };

  this.updateMessageCounter = function () {
    MessageBoard.prototype.artoo.getNode(name, "amount").innerHTML = that.messages.length;
  };

    this.init = function () {
      that.messages = [];
     MessageBoard.prototype.artoo.getNode(name)
      .appendChild(
        MessageBoard.prototype.artoo.buildElement({
          element: "textarea",
          className: "message-input"
        })
      );

      MessageBoard.prototype.artoo.getNode(name)
        .appendChild(
          MessageBoard.prototype.artoo.buildElement({
            element: "input",
            value: "skriv",
            type: "button",
            onclick: function () {
              that.sendMessage();
              return false;
            }
          })
        );

    MessageBoard.prototype.artoo.getNode(name, "message-input")
      .addEventListener("keydown", function (key) {
        if (key.keyCode === 13 && key.shiftKey === false) {
          key.preventDefault();
          that.sendMessage();
        }
      });
    };
}

MessageBoard.prototype.artoo = artooSchematic();

MessageBoard.prototype.createButton = function (tag, src, action) {
  "use strict";
  var element = document.createElement(tag);
  element.onclick = action;
  if (src !== null) {
    element.src = src;
  }
  return element;
};

