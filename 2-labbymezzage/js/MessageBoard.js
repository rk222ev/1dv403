/*global document, window, Message, artoo*/

function MessageBoard (name) {
    "use strict";

    var that = this;

    function removeMessage (pos) {
      that.messages.splice(pos, 1);
      MessageBoard.prototype.clearMessages(name);
      renderMessage(that.messages);
      updateMessageCounter();
    }

    function renderMessage (message) {
      if (Array.isArray(message)) {
        message.forEach(function (message) { renderMessage(message); });
        return;
      }

      var messageArea = artoo.getNode(name, "messages-div"),
        wrapper = artoo.buildElement({
          element: "div",
          className: "message"
        }),
        footer = document.createElement("footer");

      footer.appendChild(artoo.buildElement({
        element: "p",
        innerHTML: message.getTime()
      }));

      footer.appendChild(artoo.buildElement({
        element: "img",
        src: "pics/i.png",
        onclick: function () {
          window.alert("Inlägget skapades " + message.getDate());
        }
      }));

      footer.appendChild(artoo.buildElement({
        element: "img",
        src: "pics/x.png",
        onclick: function () {
          if (window.confirm("Är du säker på att du vill radera meddelandet?")) {
            removeMessage(that.messages.indexOf(message));
          }
        }
      }));

      wrapper.appendChild(artoo.buildElement({
        element: "p",
        className: "message-text",
        innerHTML: message.getHTMLText()
      }));

      wrapper.appendChild(footer);

      messageArea.appendChild(wrapper);
    }


    function sendMessage () {
      var textarea = artoo.getNode(name, "message-input"),
        newMessage = new Message(textarea.value, new Date());

      if (textarea.value !== "") {
        that.messages.push(newMessage);
        renderMessage(newMessage);
        textarea.value = "";
        updateMessageCounter();
      }
    }

  function updateMessageCounter () {
    artoo.getNode(name, "info-amount-of-messages")
      .innerHTML = "Antal meddelanden : " + that.messages.length;
  }

  this.init = function () {
    var mainNode = artoo.getNode(name);
    that.messages = [];

    mainNode.appendChild(
      artoo.buildElement({
        element:"div",
        className: "messages-div"
      })
    );

    mainNode.appendChild(
      artoo.buildElement({
        element: "p",
        className: "info-amount-of-messages",
        innerHTML: "Antal meddelanden : " + that.messages.length
      })
    );

    mainNode.appendChild(
      artoo.buildElement({
        element: "textarea",
        className: "message-input",
      })
    );

     mainNode.appendChild(
        artoo.buildElement({
          element: "input",
          value: "skriv",
          type: "button",
          onclick: function () {
            sendMessage();
            return false;
          }
        })
      );

  artoo.getNode(name, "message-input")
    .addEventListener("keydown", function (key) {
      if (key.keyCode === 13 && key.shiftKey === false) {
        key.preventDefault();
        sendMessage();
      }
    });
  };
}

MessageBoard.prototype.clearMessages = function (board) {
  var element = artoo.getNode(board, "messages-div");

  artoo.getNode(board).replaceChild(artoo.buildElement({
      element: "div",
      className: "messages-div"
  }), element);
};

