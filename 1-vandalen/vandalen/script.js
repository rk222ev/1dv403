"use strict";

var makePerson = function(persArr){
	var ages = [];

	function average(numbers) {
		return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
	}

	function getKeyValues(key, arr) {
		var data = [];

		arr.forEach(function(object) {
			 data[data.length] = object[key];
		});

		return data;
	}

	ages = getKeyValues("age", persArr);

	return {
		// Sorterar alla nycklar från perArr med lokalatecken och joinar med , mellan varje medlem.
		names: 		getKeyValues("name", persArr).sort(function(a, b) { return a.localeCompare(b); }).join(", "),
		minAge: 	Math.min.apply(null, ages),
		maxAge: 	Math.max.apply(null, ages),
		averageAge: Math.round(average(ages))
	};
};
