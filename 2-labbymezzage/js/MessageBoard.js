/*global document, window, Message*/

var MessageBoard = function (name) {

    "use strict";

    var that = this,
        inputButton = document.createElement("input"),
        div = document.getElementById(name);


// --------------- BUTTONS -------------

    // Send button.
    inputButton.type = "button";
    inputButton.value = "skriv";

    inputButton.onclick = function () {
        that.sendMessage();
        return false;
    };
    div.appendChild(inputButton);


// --------------- KEYBOARD CONTROLS ------------------

    // Listen for enter when a message-input is selected.
    // ignores shift-enter.
    div.getElementsByClassName("message-input")[0].onkeypress = function (e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            that.sendMessage();
        }
    };


// ----------------- Methods ---------------------

    // Clears the message Area
    that.clearMessages = function () {
        var element = div.getElementsByClassName("messages-div")[0],
            newElement = document.createElement("div");

        newElement.className = "messages-div";
        div.replaceChild(newElement, element);
    };


    // Initialises the object.
    that.init = function () {
        that.messages = [];
    };



    that.removeMessage = function (pos) {
        that.messages.splice(pos, 1);
        that.clearMessages();
        that.renderMessage(that.messages);
    };


    // Method renderMessage
    // Renders a single message and
    // updates the message counter.
    that.renderMessage = function (message) {
        if (Array.isArray(message)) {
            message.forEach(function (message) { that.renderMessage(message); });
            return;
        }
        var messageArea = div.getElementsByClassName("messages-div")[0],
            messageDiv = document.createElement("div"),
            messageP = document.createElement("p"),
            dateP = document.createElement("p"),
            messageFooter = document.createElement("footer"),

            deleteButton = that.createButton("pics/x.png", function () {
                if (window.confirm("Är du säker på att du vill radera meddelandet?")) {
                    that.removeMessage(that.messages.indexOf(message));
                }
            }),

            infoButton = that.createButton("pics/i.png", function () {
                window.alert("Inlägget skapades " + message.getDate());
            });


        messageP.className = "message-text";
        messageP.innerHTML = message.getHTMLText();

        dateP.appendChild(document.createTextNode(message.getTime()));
        messageFooter.appendChild(dateP);
        messageFooter.appendChild(infoButton);
        messageFooter.appendChild(deleteButton);

        messageDiv.className = "message";
        messageDiv.appendChild(messageP);
        messageDiv.appendChild(messageFooter);

        messageArea.appendChild(messageDiv);

        that.updateMessageCounter();
    };


    // Method sendMessage
    // Adds a new message to the messages array,
    // clears the textarea and
    // updates the message counter.
    that.sendMessage = function () {
        var textarea = div.getElementsByClassName("message-input")[0],
            newMessage = new Message(textarea.value, new Date());
        if (textarea.value !== "") {
            that.messages.push(newMessage);
            that.renderMessage(newMessage);
            textarea.value = "";
        }
    };

    that.updateMessageCounter = function () {
        div.getElementsByClassName("amount")[0].innerHTML = that.messages.length;
    };
};

window.onload = function () {
    "use strict";
    var MessageBoard1 = new MessageBoard("board1"),
        MessageBoard2 = new MessageBoard("board2");

    MessageBoard1.init();
    MessageBoard2.init();
};

MessageBoard.prototype.createButton = function (src, action) {
    "use strict";
    var element = document.createElement("img");
    element.src = src;
    element.onclick = action;
    return element;
};
