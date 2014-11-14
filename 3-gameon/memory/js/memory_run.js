"usr strict";
var MemoryApp = {

  init: function(){
    var mem1 = new Memory(3,4,"game1");
    // var mem2 = new Memory(3,4,"game2");



    mem1.start(RandomGenerator
      .getPictureArray(mem1.getSize())
    );

    // mem2.start(RandomGenerator
    //   .getPictureArray(mem2.getSize())
    // );
  },
};

window.onload = function () {

  memoryApp = MemoryApp.init();
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
  var boardNode =  document.getElementById(element),
    classNode;


  if(className === undefined)  {
    return boardNode;
  }

  classNode = boardNode.getElementsByClassName(className)[0];

  return classNode;


};

