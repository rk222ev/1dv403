"use strict";

var makePerson = function(persArr){
	var names = [];
	var ages = [];

	function average(numbers) {
			return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
	}

	persArr.map(function(person){
		if (typeof person.name === "string") {
			names.push(person.name);
		} else {
			names.push("John Doe");
		}
		if (typeof person.age === "number") {
			ages.push(person.age);
		} else {
			ages.push(NaN);
		}

	});

	ages.sort();
	
	return {
		names: names.sort(function(a, b) { return a.localeCompare(b); }).join(", "),
		minAge: ages[0],
		maxAge: ages[ages.length - 1],
		averageAge: Math.round(average(ages))
	};
};
