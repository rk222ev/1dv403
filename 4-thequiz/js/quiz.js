var QUIZ = {

  isLoaded: function () {

    QUIZ.node = document.querySelector(".app");
    QUIZ.node.removeChild(document.querySelector(".no-javascript"));

    // Loops through all keys in the QUIZ.elements object.
    Array.prototype.forEach.call(Object.keys(QUIZ.elements), function (creator) {
      var element = QUIZ.elements[creator]();

      QUIZ.node.appendChild(element);
    });

  },



};




QUIZ.elements = {

  createInput: function () { return document.createElement("input"); },

  createButton: function () { return document.createElement("button"); }

};



window.onload = function () {
  QUIZ.isLoaded();

};

