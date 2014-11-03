var makePerson = function (persArr) {
    "use strict";

    if (!(Array.isArray(persArr)) && persArr[0] === undefined) {
        throw new TypeError("The argument is empty or it is not an array.");
    }

    var ages = persArr.map(
        function (person) {
            if (person.hasOwnProperty("age")) {
                return person.age;
            }

            if (person.hasOwnProperty("born")) {
                return new Date().getFullYear() - new Date(person.born).getFullYear();
            }
            throw new Error("The person does not contain the key age or the key born.");
        }
    ),

        average = function (numbers) {
            return numbers.reduce(function (a, b) { return a + b; }) / numbers.length;
        },

        names = persArr.map(function (person) {
            if (person.hasOwnProperty("name")) {
                return person.name;
            }
            throw new Error("The person does not contain the key name.");
        }).sort(function (a, b) {
            return a.localeCompare(b);
        }).join(", ");

    return {
        names: names,
        minAge: Math.min.apply(null, ages),
        maxAge: Math.max.apply(null, ages),
        averageAge: Math.round(average(ages))
    };
};
