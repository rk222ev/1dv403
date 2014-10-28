"use strict";

var makePerson = function(persArr){
	var persons = persArr.concat();
	var today = new Date();
	var names = "";
	var nameArr = [];

	// Collectes and sorts the names
	names = persons.forEach(function(person){
		nameArr.push(person.name);
	});

	names = nameArr.sort().join(", ");


	// Sorts on born.
	// persons.sort(function (a, b) {
	// 		if (a.born > b.born) {
	// 			return 1;
	// 		} else if (a.born < b.born) {
	// 			return -1;
	// 		}
	// 		return 0;
	// });

	return {names: names, minAge: -1, maxAge: -1, averageAge: -1};
};
