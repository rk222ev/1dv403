"use strict"

/* global define, document, XMLHttpRequest */

/*
  Library of helper functions.

*/

define(["require"], function (require) {

  var utils = {};

  /*
    XMLHttpRequests a template and assigns an onreadystatechange
    callback function.
    Uses require.toUrl() to get the correct dependency URL.
    Used to fetch mustache templates.
  */
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

  /*
    Creates a div and assign a class, then takes HTML in a string
    and makes this the div-elements innerHTML.
    Used with the rendered HTML string from Mustache.render()
  */
  utils.templateParser = function (html, className) {
    var element = document.createElement("div");

    element.classList.add(className);
    element.innerHTML= html;

    return element;
  };

  return utils;

});