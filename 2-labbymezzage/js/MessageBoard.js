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
            messageDiv = document.createElement("div"),
            newMessage = {
                text: document.createElement("p"),
                date: document.createElement("p")
            };


        messageDiv.className = "message-box";

        newMessage.text.appendChild(document.createTextNode(message.getText()));
        newMessage.date.appendChild(document.createTextNode(message.getTime()));
        Object.keys(newMessage).forEach(function (key) {messageDiv.appendChild(newMessage[key]); });
        messageArea.appendChild(messageDiv);
        message.getTime();
    };


    // Send a message.
    that.sendMessage = function () {
        var textarea = div.getElementsByClassName("message-input")[0],
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
