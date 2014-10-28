//"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		upperCaseStr = str.toUpperCase();
		convertedStr = "";
		// Plats för förändring.
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren.
		try {
			if (str !== "") {
				for (var charPos in str) {
					if(upperCaseStr[charPos] === "A"){
						convertedStr += "#";
					}else if (str[charPos] === upperCaseStr[charPos]) {
						convertedStr += str[charPos].toLowerCase();
					} else {
						convertedStr += upperCaseStr[charPos];
					}
				}

				console.log(typeof(str));
				return convertedStr;
			} else {
				throw "Strängen får inte vara tom!";
			}
		} catch(e) {
			return e;
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
			var answer = convertString(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}

	});



};
