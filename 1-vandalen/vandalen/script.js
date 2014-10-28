"use strict";

var makePerson = function(persArr){
	var persons = persArr.concat();
	var collator = new Intl.Collator(["se"]);
	var names = [];
	var ages = [];
	var sum = 0;

	persons.forEach(function(person){
		names.push(person.name);
		ages.push(person.age);
		sum += person.age;
	});

	ages.sort();

	return {
		names: names.sort(collator.compare).join(", "),
		minAge: ages[0],
		maxAge: ages[ages.length -1],
		averageAge: Math.round(sum/ages.length),
	};
};
