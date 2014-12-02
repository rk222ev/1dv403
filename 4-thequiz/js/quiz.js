"use strict";

/*global document, window, XMLHttpRequest */

var QUIZ = {

  URL: "http://vhost3.lnu.se:20080/question/1",
  correctAnswers: 0,
  wrongAnswers: 0,

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

  correctAnswer: function () {
    var div = document.querySelector(".status-area");

    QUIZ.correctAnswers += 1;

    div.innerHTML = "<p>Rätt Svar! Klicka här för att gå till <a href=''>nästa fråga.</a></p>";

    QUIZ.XHR.removeEventListener("load", QUIZ.handleAnswer);
    QUIZ.URL = JSON.parse(QUIZ.XHR.response).nextURL;


  },

  wrongAnswer: function () {
    var div = document.querySelector(".status-area");

    QUIZ.wrongAnswers += 1;

    div.innerHTML = "<p>Fel svar! Försök igen.</p>";
  },

  sendAnswer: function (e)  {
    QUIZ.ajax.makeRequest({
      type: "POST",
      URL: QUIZ.question.nextURL,
      contentType: "application/json;charset=UTF-8",
      json: JSON.stringify({answer: document.querySelector(".input-text").value}),
      handler: QUIZ.ajax.handleAnswer
    });

  },

  updateQuestion: function () {
    var div = document.querySelector(".question-area");
    var replacement = document.createElement("div");
    var p = document.createElement("p");
    var span = document.createElement("span");

    span.innerHTML = "Fråga " + QUIZ.question.id + ": ";
    span.classList.add("question-number");
    p.innerHTML = QUIZ.question.question;

    replacement.appendChild(span);
    replacement.appendChild(p);

    div.parentNode.replaceChild(replacement, div);

    document.querySelector(".input-text").focus();

  }

};


QUIZ.ajax = {

  handleAnswer: function (e) {
    if (QUIZ.XHR.readyState === 4) {

      if (QUIZ.XHR.status === 200) {
       QUIZ.correctAnswer();
      } else {
        QUIZ.wrongAnswer();
      }
    }
  },

  handleQuestion: function (q) {
    QUIZ.question = JSON.parse(QUIZ.XHR.response);
    QUIZ.updateQuestion();
    QUIZ.XHR.removeEventListener("load", QUIZ.ajax.handleQuestion);

  },

  makeRequest: function (params) {
    var URL   = params.URL,
        data = params.json || null,
        type  = params.type || "GET",
        handler = params.handler,
        contentType = params.contentType || null;

    QUIZ.XHR = new XMLHttpRequest();
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

