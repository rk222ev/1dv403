"use strict";

var makePerson = function(persArr){

	var ages = getKeyValues("age", persArr);
	
	function average(numbers) {
		return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
	}

	function getKeyValues(key, arr) {

		return arr.map(function(arr) {
			 return arr[key];
		});

	}


	return {
		// Sorterar alla nycklar från perArr med lokalatecken och joinar med , mellan varje medlem.
		names: 		getKeyValues("name", persArr).sort(function(a, b) { return a.localeCompare(b); }).join(", "),
		minAge: 	Math.min.apply(null, ages),
		maxAge: 	Math.max.apply(null, ages),
		averageAge: Math.round(average(ages))
	};
};
