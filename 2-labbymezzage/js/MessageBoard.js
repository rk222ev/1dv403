/*global document, window, Message*/

function MessageBoard (name) {
    "use strict";

    var that = this;

    function clearMessages () {
      var element = MessageBoard.prototype.artoo.getNode(name, "messages-div");

      MessageBoard.prototype.artoo.getNode(name).replaceChild(MessageBoard.prototype.artoo.buildElement({
          element: "div",
          className: "messages-div"
      }), element);
    }

    function removeMessage (pos) {
      that.messages.splice(pos, 1);
      clearMessages();
      renderMessage(that.messages);
      updateMessageCounter();
    }

    function renderMessage (message) {
      if (Array.isArray(message)) {
        message.forEach(function (message) { renderMessage(message); });
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
            removeMessage(that.messages.indexOf(message));
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
    }


    function sendMessage () {
      var textarea = MessageBoard.prototype.artoo.getNode(name, "message-input"),
        newMessage = new Message(textarea.value, new Date());

      if (textarea.value !== "") {
        that.messages.push(newMessage);
        renderMessage(newMessage);
        textarea.value = "";
        updateMessageCounter();
      }
    }

  function updateMessageCounter () {
    MessageBoard.prototype.artoo.getNode(name, "info-amount-of-messages")
      .innerHTML = "Antal meddelanden : " + that.messages.length;
  }

  this.init = function () {
    var mainNode = MessageBoard.prototype.artoo.getNode(name);
    that.messages = [];

    mainNode.appendChild(
      MessageBoard.prototype.artoo.buildElement({
        element:"div",
        className: "messages-div"
      })
    );

    mainNode.appendChild(
      MessageBoard.prototype.artoo.buildElement({
        element: "p",
        className: "info-amount-of-messages",
        innerHTML: "Antal meddelanden : " + that.messages.length
      })
    );

    mainNode.appendChild(
      MessageBoard.prototype.artoo.buildElement({
        element: "textarea",
        className: "message-input",
      })
    );

     mainNode.appendChild(
        MessageBoard.prototype.artoo.buildElement({
          element: "input",
          value: "skriv",
          type: "button",
          onclick: function () {
            sendMessage();
            return false;
          }
        })
      );

  MessageBoard.prototype.artoo.getNode(name, "message-input")
    .addEventListener("keydown", function (key) {
      if (key.keyCode === 13 && key.shiftKey === false) {
        key.preventDefault();
        sendMessage();
      }
    });
  };
}

MessageBoard.prototype.artoo = artooSchematic();
