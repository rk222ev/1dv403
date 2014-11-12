window.onload = function () {
  "use strict";

  var messageBoard1 =  new MessageBoard("board1"),
    messageBoard2 = new MessageBoard("board2");
};


// Builds an DOM node based on a object with certain keys.
document.buildElement = function (params) {

  if (params.hasOwnProperty("element")) {
    element = document.createElement(params.element);
  }

  if (params.hasOwnProperty("className")) {
    element.className = params.className;
  }

  if (params.hasOwnProperty("innerHTML")) {
    element.innerHTML = params.innerHTML;
  }

  if (params.hasOwnProperty("onclick")) {
    element.onclick = params.onclick;
  }

  if (params.hasOwnProperty("src")) {
    element.src = params.src;
  }

  if (params.hasOwnProperty("type")) {
    element.type = params.type;
  }

  if (params.hasOwnProperty("value")) {
    element.value = params.value;
  }

  return element;
};


// Gets DOM nodes based on id and class.
document.getNode =  function (element, className) {
  var boardNode =  document.getElementById(element);

  if(className === undefined)  {
    return boardNode;
  }

  return boardNode.getElementsByClassName(className)[0];
};


