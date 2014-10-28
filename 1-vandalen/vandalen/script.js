"use strict";

var makePerson = function(persArr){
	var persons = persArr.concat();
	var today = new Date();
	var names= [];
	var maxAge = [];

	// Collectes and sorts the names
	persons.forEach(function(person){
		names.push(person.name);
	});


	return {
		names: names.sort().join(", "),
		minAge: -1,
		maxAge: -1,
		averageAge: -1
	};
};
