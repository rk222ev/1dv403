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

    QUIZ.ajax.makeRequest({type: "GET", URL: QUIZ.URL, handler: QUIZ.ajax.handleQuestion});

  },

  sendAnswer: function (e)  {
    QUIZ.ajax.makeRequest({
      type: "POST",
      URL: QUIZ.question.nextURL,
      contentType: "application/json;charset=UTF-8",
      json: JSON.stringify({answer: "2"}),
      handler: QUIZ.ajax.handleAnswer
    });

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

  handleQuestion: function (q) {
    QUIZ.question = JSON.parse(QUIZ.XHR.response);
    QUIZ.updateQuestion();
    QUIZ.XHR.removeEventListener("load", QUIZ.ajax.handleQuestion);

  },

  makeRequest: function (params) {
    var URL   = params.URL,
        data = params.json || null,
        type  = params.type,
        handler = params.handler,
        contentType = params.contentType;

   QUIZ.XHR.addEventListener("load", handler);
   QUIZ.XHR.open(type ,URL);

   if (contentType) {
    QUIZ.XHR.setRequestHeader("Content-Type", contentType);
   }

   QUIZ.XHR.send(data || null);

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
    input.addEventListener("mousedown", QUIZ.sendAnswer);
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


 /* var x = new XMLHttpRequest();
  var json = JSON.stringify({answer: "2"});
    x.open("POST", "http://vhost3.lnu.se:20080/answer/1");
    x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(json);
    x.send(json);*/

};

