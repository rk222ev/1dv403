/*global document, window, Message*/

function MessageBoard(name) {
	
	"use strict";

    var that = this,
        inputButton = document.createElement("input"),
        div = document.getElementById(name);


    // Send button.
    inputButton.type = "button";
    inputButton.value = "skriv";

    inputButton.onclick = function () {
        that.sendMessage();
        return false;
    };
    div.appendChild(inputButton);


    // Initialises the object.
    that.init = function () {
        that.messages = [];

        if (that.messages[0] !== undefined) {
            that.renderMessages();
        }

    };

    // Renders all messages.
    that.renderMessages = function () {
        that.messages.forEach(function (message) {
            that.renderMessage(message);
        });
    };

    // Renders a single message.
    that.renderMessage = function (message) {
        var messageArea = div.getElementsByClassName("messages-div")[0],
            p = document.createElement("p");

        p.appendChild(document.createTextNode(message.getText()));
        messageArea.appendChild(p);
    };


    // Send a message.
    that.sendMessage = function () {
        var textarea = div.getElementsByClassName("message")[0],
            newMessage = new Message(textarea.value, new Date());

        that.messages.push(newMessage);
        that.renderMessage(newMessage);
        textarea.value = "";
    };
}

window.onload = function () {
    "use strict";
    var MessageBoard1 = new MessageBoard("board1"),
        MessageBoard2 = new MessageBoard("board2");

    MessageBoard1.init();
    MessageBoard2.init();
};
