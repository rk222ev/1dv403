"use strict";

/*global document, requirejs, window */

requirejs.config({
  baseUrl: 'js/lib',

  paths: {
    pwd:    '../PWD',
    apps: "../PWD/apps",
    jquery: "jquery-2.1.1",
    require: "../require",
  }
});

requirejs(["pwd/pwd"],
function   (pwd) {

});
