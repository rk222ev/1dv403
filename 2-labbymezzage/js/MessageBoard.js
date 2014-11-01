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

    // Send button
    var inputButton = document.createElement("input");
    inputButton.type = "button";
    inputButton.value = "skriv";
    // inputButton.onclick = function (e) { that.sendMessage(); return false;};
    inputButton.onclick = function (e) {
        //var test = div.getElementByClassName("message");
        // console.log(div.getElementsByClassName("message"));
        that.sendMessage(div.getElementsByClassName("message")[0].value); return false;
    };

    div.appendChild(inputButton);

    that.sendMessage = function (message) {
        that.messages.push({message: message, time: new Date()});
    };

    that.messages = [];
}

window.onload = function() {
    var MessageBoard1 = new MessageBoard("board1");
    var MessageBoard2 = new MessageBoard("board2");
};
