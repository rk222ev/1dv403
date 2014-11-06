var artooSchematics = function () {
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

		return element;
	};

	return that;
};