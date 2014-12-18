"use strict";

/*global PWD */

define(function () {

  /*
    Denna metod tar antalet rader och columner som inparameter.

    Metoden returnerar en array innehållandes utslumpade tal mellan 1 och (rows*cols)/2. Varje tal representeras två
    gånger och motsvarar således en spelbricka.

    I en 4*4 matris kan Arrayen t.ex. se ut så här:
    [1,2,6,8,6,2,5,3,1,3,7,5,8,4,4,7]

    I en 2*4 matris kan Arrayen t.ex. se ut så här:
    [3,4,4,1,2,1,2,3]
  */

 return function (params) {
  //getPictureArray: function(params) {
    var rows          = params.rows,
        cols          = params.cols,
        highestValue  = rows * cols / 2,
        values        = [],
        images        = [],
        i;

    // Give the images array values ranging from 1 to x.
    // assigning the number twice.
    for (i = 1; i <= highestValue; i += 1) {
      values[i] = i;
      values[i + highestValue] = i;
    }

    // Loops through our values and assigns it to an unused arrayindex.
    values.forEach(function(imageValue) {
      var arrayIndex;

      do {
        arrayIndex = Math.floor( (Math.random() * (rows * cols - 0) + 0) );

      } while (images[arrayIndex] !== undefined);

      images[arrayIndex] = imageValue;
    });

    return images;
  };
});


