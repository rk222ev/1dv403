"use strict";

window.onload = function(){


	var birthday = function(date){
		if (Date.parse(date)) {
			// Can I make it a constant somehow?
			var birthday;
			var msToBirthday;
			var msPerDay = 1.15740740740741E-08;
			var today = new Date();


			today.setHours(0);
			birthday = new Date(date);
			birthday.setYear(today.getFullYear());

			msToBirthday = birthday.getTime() - today.getTime();
			return Math.floor(msToBirthday *  msPerDay);

		} else {
			throw new Error("Du måste ange ett korrekt datum!");
		}

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}

	});



};
