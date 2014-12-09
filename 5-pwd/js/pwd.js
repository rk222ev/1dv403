/*global document, window */
"use strict";


var PWD = {
  apps: {}
};

 requirejs.config({
      baseUrl: 'js/',

      paths: {
          app: '../js/apps',
          memory: '../js/apps/memory',
          rssReader: '../js/apps/rssReader',
          win: '../js/window'
      }
  });

  requirejs([
    'desktop',
    'app/imageViewer',
    'memory/Memory',
    'memory/random',
    'rssReader/RssReader',
    'win/Window',
    'win/elements',
    'win/events'
  ],

  window.onload = function   (desktop) {

    PWD.desktop.init();
  });
