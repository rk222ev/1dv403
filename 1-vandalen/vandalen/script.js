"use strict";

var makePerson = function(persArr){
	var names = [];
	var ages = [];

	persArr.forEach(function(person){
		names.push(person.name);
		ages.push(person.age);
	});

	ages.sort();

	return {
		names: names.sort().join(", "),
		minAge: ages[0],
		maxAge: ages[ages.length - 1],
		averageAge: Math.round(ages.reduce(function(a, b) {
			return a + b;
		 }) / ages.length),
	};
};
