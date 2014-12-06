"use strict";

/*global document, window, XMLHttpRequest */

var QUIZ = {

  URL: "http://vhost3.lnu.se:20080/question/1", // The URL that starts the quiz.
  log: {},

  // Creates an initializes the game.
  init: function () {

    QUIZ.node = document.querySelector(".app");
    QUIZ.node.removeChild(document.querySelector(".no-javascript"));

    // Loops through all keys in the QUIZ.elements object.
    Object.keys(QUIZ.elements).forEach( function (creator) {
      var element = QUIZ.elements[creator]();

      QUIZ.node.appendChild(element);
    });

    QUIZ.handlers.makeRequest({
      type:     "GET",
      URL:      QUIZ.URL,
      handler:  QUIZ.handlers.updateQuestion});
  },


  correctAnswer: function () {
    var div = document.querySelector(".status-area");
    var a = document.createElement("a") ;

    a.setAttribute("href", "#");
    a.innerHTML = "Nästa fråga.";

    a.addEventListener("mousedown", QUIZ.handlers.getNewQuestion);
    a.addEventListener("keydown", QUIZ.handlers.getNewQuestion);

    QUIZ.correctAnswers += 1;

    div.innerHTML = "<p>Ditt svar var rätt!</p>";
    div.appendChild(a);

    QUIZ.XHR.removeEventListener("load", QUIZ.checkAnswer);
    QUIZ.URL = JSON.parse(QUIZ.XHR.response).nextURL;

    if (QUIZ.URL === undefined) {
      QUIZ.noMoreQuestions();
    }
  },


  wrongAnswer: function () {
    var div = document.querySelector(".status-area");
    document.querySelector(".input-text").select();
    QUIZ.wrongAnswers += 1;

    div.innerHTML = "<p>Fel svar! Försök igen.</p>";
  },


  drawQuestion: function () {
    var div         = document.querySelector(".question-area"),
        replacement = document.createElement("div"),
        p           = document.createElement("p"),
        span        = document.createElement("span");

    span.innerHTML = "Fråga " + QUIZ.question.id + ": ";
    span.classList.add("question-number");
    p.innerHTML = QUIZ.question.question;

    replacement.classList.add("question-area");
    replacement.appendChild(span);
    replacement.appendChild(p);

    div.parentNode.replaceChild(replacement, div);

    document.querySelector(".status-area").innerHTML = "";
    document.querySelector(".input-text").value = "";
    document.querySelector(".input-text").focus();
  },


  noMoreQuestions: function () {
    var div       = document.querySelector(".app"),
        tries     = document.createElement("p"),
        table     = document.createElement("table"),
        questions = document.createElement("p"),
        trHeader  = document.createElement("tr"),
        thQ       = document.createElement("th"),
        thN       = document.createElement("th"),

        tr, tdId, tdTries;

    QUIZ.log[QUIZ.question.id] += 1;
    div.innerHTML = "<p>Grattis du klarade spelet!</p>";

    thQ.innerHTML = "Fråga";
    thN.innerHTML = "Försök";
    trHeader.appendChild(thQ);
    trHeader.appendChild(thN);
    table.appendChild(trHeader);

    Object.keys(QUIZ.log).forEach(function (q) {
      tr      = document.createElement("tr");
      tdId    = document.createElement("td");
      tdTries = document.createElement("td");

      tdId.innerHTML = q;
      tr.appendChild(tdId);

      tdTries. innerHTML = QUIZ.log[q];
      tr.appendChild(tdTries);

      table.appendChild(tr);

    });

    div.appendChild(table);
  }
};


QUIZ.handlers = {

  checkAnswer: function (e) {
    if (QUIZ.XHR.readyState === 4) {

      if (QUIZ.XHR.status === 200) {
       QUIZ.correctAnswer();
      } else {
        QUIZ.wrongAnswer();
      }
    }

    QUIZ.log[QUIZ.question.id] += 1;
  },


  updateQuestion: function (q) {
    QUIZ.question = JSON.parse(QUIZ.XHR.response);
    QUIZ.XHR.removeEventListener("load", QUIZ.handlers.updateQuestion);
    QUIZ.drawQuestion();
    QUIZ.log[QUIZ.question.id] = 0;
  },


  getNewQuestion: function (e) {
    if (e.type !== "keydown" || e.keyCode === 13) {
      e.preventDefault();
      QUIZ.handlers.makeRequest({
        URL: QUIZ.URL,
        handler: QUIZ.handlers.updateQuestion
      });
    }
  },


  makeRequest: function (params) {
    var URL         = params.URL,
        data        = params.json || null,
        type        = params.type || "GET",
        handler     = params.handler,
        contentType = params.contentType || null;

    QUIZ.XHR = new XMLHttpRequest();
    QUIZ.XHR.addEventListener("load", handler);
    QUIZ.XHR.open(type ,URL, true);

    if (contentType) {
      QUIZ.XHR.setRequestHeader("Content-Type", contentType);
    }

    QUIZ.XHR.send(data || null);
  },


 sendAnswer: function (e)  {
    if (e.type !== "keypress" || e.keyCode === 13) { // Filters out all keypress events except on the enterkey.
      QUIZ.handlers.makeRequest({

        type:         "POST",
        URL:          QUIZ.question.nextURL,
        contentType:  "application/json;charset=UTF-8",
        json:         JSON.stringify({answer: document.querySelector(".input-text").value}),
        handler:      QUIZ.handlers.checkAnswer
      });
    }
  },
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
    input.addEventListener("keypress", QUIZ.handlers.sendAnswer);
    return input;

  },

  createButton: function () {
    var input = document.createElement("input");

    input.setAttribute("type", "submit");
    input.setAttribute("value", "Svara");
    input.classList.add("input-submit");
    input.addEventListener("mousedown", QUIZ.handlers.sendAnswer);
    return input;
  },

  createStatusArea: function () {
    var div = document.createElement("div");

    div.classList.add("status-area");
    return div;
  },
};



window.onload = function () {
  QUIZ.init();
};

