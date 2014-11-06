var artooSchematic = function () {
	"use strict";
	var that ={};


	that.buildElement =  function (params) {

		var element;

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

	that.getNode =  function (element, className) {
	    var boardNode =  document.getElementById(element);

	    if(className === undefined)  {
	      return boardNode;
	    }

    	return boardNode.getElementsByClassName(className)[0];
  	};

	return that;
};