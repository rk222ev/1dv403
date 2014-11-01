"use strict";
window.onload = function() {
    engine.init();
};

var engine = {
        init: function () {
            var test = new Message("Testar massa", new Date());

            console.log(test);
        }
};
