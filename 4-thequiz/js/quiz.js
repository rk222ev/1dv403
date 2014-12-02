"use strict";

/*global document, window, XMLHttpRequest */

var QUIZ = {

  URL: "http://vhost3.lnu.se:20080/question/1",
  XHR: new XMLHttpRequest(),


  isLoaded: function () {

    QUIZ.node = document.querySelector(".app");
    QUIZ.node.removeChild(document.querySelector(".no-javascript"));

    // Loops through all keys in the QUIZ.elements object.
    Array.prototype.forEach.call(Object.keys(QUIZ.elements), function (creator) {
      var element = QUIZ.elements[creator]();

      QUIZ.node.appendChild(element);
    });

    QUIZ.ajax.makeRequest(QUIZ.URL);

  },

  updateQuestion: function () {
    var div = document.querySelector(".question-area");
    var p = document.createElement("p");
    var span = document.createElement("span");

    span.innerHTML = "Fråga 1: ";
    span.classList.add("question-number");
    p.innerHTML = QUIZ.question.question;

    div.appendChild(span);
    div.appendChild(p);

  }



};


QUIZ.ajax = {

  handleResponse: function (q) {
    QUIZ.question = JSON.parse(QUIZ.XHR.response);
    QUIZ.updateQuestion();

  },

  makeRequest: function (URL) {
   QUIZ.XHR.addEventListener("load", QUIZ.ajax.handleResponse);
   QUIZ.XHR.open("GET",URL);
   QUIZ.XHR.send();

  }

};



QUIZ.elements = {

  createQuestionDiv: function () {
    var div = document.createElement("div");
    div.classList.add("question-area");
    return div;
  },

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
  },

  createStatusArea: function () {
    var div = document.createElement("div");
    div.classList.add("status-area");
    return div;
  }

};



window.onload = function () {
  QUIZ.isLoaded();

};

