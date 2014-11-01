"use strict";

var makePerson = function(persArr){

	if(!(Array.isArray(persArr)) && persArr[0] === undefined) {
		throw new TypeError("Data is not an array of names and ages or birthdates.");
	}

	var ages = persArr.map(
		function(person) {
			if ("age" in person) {
				return person.age;
			} else if ("born" in person) {
				return new Date().getFullYear() - new Date(person.born).getFullYear();
			}

			throw new Error("Data does not contain a key named age or born.");
		}
	);

 	var average = function(numbers) {
		return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
	};

	var names = persArr.map(function(person) {return person.name;}).sort(function(a, b) { return a.localeCompare(b); }).join(", ");

	return {
		names: 		names,
		minAge: 	Math.min.apply(null, ages),
		maxAge: 	Math.max.apply(null, ages),
		averageAge: Math.round(average(ages))
	};
};
