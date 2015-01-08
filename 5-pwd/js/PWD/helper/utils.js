"use strict"


define(["require"], function (require) {

  var utils = {};

  utils.getTemplate = function (url, onload) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', require.toUrl(url));

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        onload(xhr.responseText);
      }
    };

    xhr.send(null);

  };

  utils.templateParser = function (html, className) {
    var element = document.createElement("div");

    element.classList.add(className);
    element.innerHTML= html;

    return element;
  };

  return utils;

});