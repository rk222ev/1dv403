"use strict";

var MessageBoard= {

        messages: [],

        init: function () {
            var test = new Message("Testar massa", new Date());

            console.log(test);
        }
};

window.onload = function() {
    MessageBoard.init();
};
