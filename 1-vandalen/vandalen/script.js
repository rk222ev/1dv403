"use strict";

var makePerson = function(persArr){

		var ages = [];

		function average(numbers) {
			return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
		}

		function getKeyValues(key, arr) {

			return arr.map(function(arr) {
				 return arr[key];
			});
		}

	try {

		if (!Array.isArray(persArr) && !("name" in persArr) && !("age" in persArr)) {
			throw new TypeError("Varible is not an array containing the name and age keys.");
		}

		ages = getKeyValues("age", persArr);


		return {
			// Sorterar alla nycklar från perArr med lokalatecken och joinar med , mellan varje medlem.
			names: 		getKeyValues("name", persArr).sort(function(a, b) { return a.localeCompare(b); }).join(", "),
			minAge: 	Math.min.apply(null, ages),
			maxAge: 	Math.max.apply(null, ages),
			averageAge: Math.round(average(ages))
		};
	} catch (error){
		// Do something.
	}
};
