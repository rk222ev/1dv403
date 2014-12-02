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

  createInput: function () {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("input-text");
    return input;

  },

  createButton: function () {
    var input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Svara");
    input.classList.add("input-submit");
    return input;
  }

};



window.onload = function () {
  QUIZ.isLoaded();

};

