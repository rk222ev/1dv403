/*global document, window, Message*/

function MessageBoard (name) {
    "use strict";

    var that = this,
      div = document.getElementById(name),
      inputButton = that.createButton("input", null,
        function () {
          that.sendMessage();
          return false;
        });


    // Send button.
    inputButton.type = "button";
    inputButton.value = "skriv";
    div.appendChild(inputButton);


    // Listen for enter when a message-input is selected.
    // ignores shift-enter.
    div.getElementsByClassName("message-input")[0].onkeypress = function (e) {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        that.sendMessage();
      }
    };


  // Clears the message Area
    this.clearMessages = function () {
      var element = div.getElementsByClassName("messages-div")[0];


      div.replaceChild(MessageBoard.prototype.artoo.buildElement({
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

    // Method renderMessage
    // Renders a single message and
    // updates the message counter.
    this.renderMessage = function (message) {
      if (Array.isArray(message)) {
        message.forEach(function (message) { that.renderMessage(message); });
        return;
      }

      var messageArea = div.getElementsByClassName("messages-div")[0],

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


    // Method sendMessage
    // Adds a new message to the messages array,
    // clears the textarea and
    // updates the message counter.
    this.sendMessage = function () {
      var textarea = div.getElementsByClassName("message-input")[0],
        newMessage = new Message(textarea.value, new Date());

      if (textarea.value !== "") {
        that.messages.push(newMessage);
        that.renderMessage(newMessage);
        textarea.value = "";
        that.updateMessageCounter();
      }
    };

  this.updateMessageCounter = function () {
    div.getElementsByClassName("amount")[0].innerHTML = that.messages.length;
  };

    this.init = function () { that.messages = []; };

  }

MessageBoard.prototype.artoo = artooSchematics();

MessageBoard.prototype.createButton = function (tag, src, action) {
  "use strict";
  var element = document.createElement(tag);
  element.onclick = action;
  if (src !== null) {
    element.src = src;
  }
  return element;
};

MessageBoard.prototype.buildElement = function (tag, className, innerHTML) {
  "use strict";
  var element = document.createElement(tag);
  if (Array.isArray(tag)) {
    return tag.forEach(function (data) { return this.buildElement(data); });
  }
  if (className !== null) {
    element.className = className;
  }

  if (innerHTML !== undefined) {
    element.innerHTML = innerHTML;
  }

  return element;
};

