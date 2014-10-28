"use strict";

var makePerson = function(persArr){
	var persons = persArr.concat();
	var names= [];
	var ages = [];
	var sum = 0;

	persons.forEach(function(person){
		names.push(person.name);
		ages.push(person.age);
		sum += person.age;
	});

	ages.sort();

	return {
		names: names.sort().join(", "),
		minAge: ages[0],
		maxAge: ages[ages.length -1],
		averageAge: Math.round(sum/ages.length),
	};
};
