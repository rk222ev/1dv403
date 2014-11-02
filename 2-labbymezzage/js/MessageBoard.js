/*global document, window, Message*/

function MessageBoard(name) {

    "use strict";

    var that = this,
        inputButton = document.createElement("input"),
        deleteButton = document.createElement("img"),
        infoButton = document.createElement("img"),
        div = document.getElementById(name);


    // Send button.
    inputButton.type = "button";
    inputButton.value = "skriv";

    inputButton.onclick = function () {
        that.sendMessage();
        return false;
    };
    div.appendChild(inputButton);

    // Delete button
    deleteButton.src = "pics/x.png";

    deleteButton.onclick = function () {
        console.log("Deletebutton onclick.");
    };

    // Info button
    infoButton.src = "pics/i.png";

    infoButton.onclick = function () {
        console.log("InfoButton onclick");
    };

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
            messageP = document.createElement("p"),
            messageFooter = document.createElement("footer");

        messageP.appendChild(document.createTextNode(message.getText()));

        messageFooter.className = "message";
        messageFooter.appendChild(document.createTextNode(message.getTime()));
        messageFooter.appendChild(infoButton);
        messageFooter.appendChild(deleteButton);

        messageArea.appendChild(messageP);
        messageArea.appendChild(messageFooter);

        that.updateMessageCounter();
    };


    // Send a message.
    that.sendMessage = function () {
        var textarea = div.getElementsByClassName("message-input")[0],
            newMessage = new Message(textarea.value, new Date());

        that.messages.push(newMessage);
        that.renderMessage(newMessage);
        textarea.value = "";
    };

    that.updateMessageCounter = function () {
        div.getElementsByClassName("amount")[0].innerHTML = that.messages.length;
    };
}

window.onload = function () {
    "use strict";
    var MessageBoard1 = new MessageBoard("board1"),
        MessageBoard2 = new MessageBoard("board2");

    MessageBoard1.init();
    MessageBoard2.init();
};
