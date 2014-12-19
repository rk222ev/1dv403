define(function () {

  var Window = function (id) {

    this.width = 500;
    this.height = 400;
    this.top = 10;
    this.left = 10;
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
    $('#' + this.getId()).find(".statusbar-text").text(text);

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

  Window.prototype.setOpeningPosition = function () {
    var openedWindows = document.querySelectorAll(".pwd .app").length;
    var offset = openedWindows * 10;
    var x = this.left + offset % (900 - this.width);
    var y = this.top + offset % (620 - this.height);

    this.setPosition(x, y);
  };


    Window.prototype.setAsLoaded = function () {
        $('#' + this.getId() + ' .app-status-icon').attr('src', this.icons.placeholder);
    };


    Window.prototype.setAsLoading = function () {
        $('#' + this.getId() + ' .app-status-icon').attr('src', this.icons.loading);
    };

  return Window;

});

