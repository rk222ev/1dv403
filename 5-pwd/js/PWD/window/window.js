define(function () {

  var Window = function (id) {

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

    this.getId = function () { return id; };
  };


  // Sets the text displayed on the window statusbar.
  Window.prototype.setStatusbarText = function (text) {
    console.log(this);

  };


  //Updates the windows position.
  Window.prototype.setPosition = function (x, y) {
    var node = $('#' + this.getId());
    var maxX = 1020 - this.width;
    var maxY = 640 - this.height;

    /*
        Checks window posistions to make sure it isnt placed
        outside of the "desktop".
    */
    this.left += x;
    if (this.left < 0) {
        this.left = 0;
    } else if (this.left > maxX) {
        this.left = maxX;
    }

    this.top += y;
    if (this.top < 0) {
        this.top = 0;
    } else if (this.top > maxY) {
        this.top = maxY;
    }


    node.css('left', this.left + 'px');
    node.css('top', this.top + 'px');
  };


  return Window;

});

