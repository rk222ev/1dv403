"use strict";

var makePerson = function(persArr){
		var ages = [];
		var average;
		var names = [];

	try {


		names = persArr.map(function(person) {return person.name;}).sort(function(a, b) { return a.localeCompare(b); }).join(", ");

		ages = persArr.map(
			function(person) {
				if ("age" in person) {
					return person.age;
				} else if ("born" in person) {
						return new Date().getFullYear() - new Date(person.born).getFullYear();
				} else {
					throw new Error("Cant find the member age or born.");
				}
			}
		);


	 	average = function(numbers) {
			return numbers.reduce(function(a, b) { return a + b;}) / numbers.length;
		};

		return {
			names: 		names,
			minAge: 	Math.min.apply(null, ages),
			maxAge: 	Math.max.apply(null, ages),
			averageAge: Math.round(average(ages))
		};
	} catch (error){
		//console.log(error);
		throw new Error(error);
	}
};
