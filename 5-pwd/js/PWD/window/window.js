"use strict"

/* global define, document, $ */

define(["pwd/helper/settings"], function (settings) {

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
        var maxX = settings.width - this.width;
        var maxY = settings.height - this.height;

        /*
            Checks window posistions to make sure it isnt placed
            outside of the "desktop".
        */
        if (x || y) {

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
        }

        node.css('left', this.left + 'px');
        node.css('top', this.top + 'px');
    };


    Window.prototype.setOpeningPosition = function () {
        var openedWindows = document.querySelectorAll(".pwd .app").length;
        var offset = openedWindows * 10;
        var x = this.left + offset % (settings.width - this.width);
        var y = this.top + offset % (settings.height - this.height);
        var sizeDiff = settings.height - this.height - this.top;

        // Make sure too large windows are not extending outside the desktop.
        if (sizeDiff < 0) {
            x = 0;
            this.height = sizeDiff + settings.height;
            document.getElementById(this.getId()).style.height = this.height + "px";
        }

        this.setPosition(x, y);
    };


    Window.prototype.setAsLoaded = function () {
        $('#' + this.getId() + ' .app-status-icon').attr('src', this.icons.placeholder);
    };


    Window.prototype.setAsLoading = function () {
        $('#' + this.getId() + ' .app-status-icon').attr('src', this.icons.loading);
    };


    Window.prototype.toggleFullscreen = function (obj) {
        var windowNode = document.getElementById(obj.win.getId());

        if (obj.win.maximized) {

            windowNode.style.width = obj.win.width + 'px';
            windowNode.style.height = obj.win.height + 'px';

            obj.win.setPosition();
            obj.win.maximized = false;

        } else {
            windowNode.style.top = "0";
            windowNode.style.left = "0";
            windowNode.style.width = "100%";
            windowNode.style.height = "100%";

            windowNode.querySelector(".maximize-button").src = obj.win.icons.minimize;

            obj.win.maximized = true;
        }
    };

  return Window;

});

