/*global document, requirejs, window */
"use strict";


var PWD = {
  apps: {}
};

 requirejs.config({
      baseUrl: 'js/',

      paths: {
          PWD:    '../js/PWD',
          app:    '../js/PWD/apps',
          window: '../js/PWD/window'
      }
  });

  requirejs([
    'PWD/desktop',
    'app/imageViewer',
    'app/memory/Memory',
    'app/memory/random',
    'app/rssReader/RssReader',
    'window/Window',
    'window/elements',
    'window/events'
  ],

  window.onload = function   (desktop) {

    PWD.desktop.init();
  });
