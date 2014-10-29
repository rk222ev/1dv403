"use strict";

var makePerson = function(persArr){
	var names = [];
	var ages = [];
	var average = function(numbers) {
			return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
	};

	persArr.forEach(function(person){
		names.push(person.name);
		ages.push(person.age);
	});

	ages.sort();

	return {
		names: names.sort(function(a, b) { return a.localeCompare(b); }).join(", "),
		minAge: ages[0],
		maxAge: ages[ages.length - 1],
		averageAge: Math.round(average(ages))
	};
};
