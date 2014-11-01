"use strict";

// var MessageBoard= {
//
//         messages: [],
//
//         init: function () {
//             var test = new Message("Testar massa", new Date());
//
//             console.log(test);
//         }
// };



function MessageBoard (name) {
    var that = this;
    var div = document.getElementById(name);

    that.messages = [];

    // Send button
    var inputButton = document.createElement("input");
    inputButton.type = "button";
    inputButton.value = "skriv";

    inputButton.onclick = function (e) {
        that.sendMessage();
        return false;
    };

    div.appendChild(inputButton);


    that.init = function () {
        if(that.messages[0] !== undefined) {
            that.renderMessages();
        }

    };

    that.renderMessages = function () {
        that.messages.forEach(function (message) {
            that.renderMessage(message);
        });
    };

    that.renderMessage = function (message) {
        var messageArea = div.getElementsByClassName("messages-div")[0];
        var p = document.createElement("p");

        console.log(message);

        p.appendChild(document.createTextNode(message.text));
        messageArea.appendChild(p);
    };


    that.sendMessage = function () {
        var textarea = div.getElementsByClassName("message")[0];
        var message = {text: textarea.value, time: new Date()};

        that.messages.push(message);
        textarea.value = "";
        that.renderMessage(message);
    };
}

window.onload = function() {
    var MessageBoard1 = new MessageBoard("board1");
    var MessageBoard2 = new MessageBoard("board2");

    MessageBoard1.init();
    // MessageBoard1.renderMessage({text: "Hohohohooh", time: new Date()});
};
