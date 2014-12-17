define(function () {

  var Window = function () {

    this.width = 500;
    this.height = 400;
    this.top = 0;
    this.left = 0;
    this.caughtX = 0;
    this.caughtY = 0;
    this.maximized = false;

    this.icons = {
        close:    "pics/icons/clear.svg",
        maximize: "pics/icons/chevron-up.svg",
        minimize: "pics/icons/chevron-down.svg",
        loading:  "pics/ajax-loader.gif",
        placeholder: "pics/ajax-placeholder.gif",
        settings: "pics/icons/cog.svg",
    };
  };


  return Window;

});

