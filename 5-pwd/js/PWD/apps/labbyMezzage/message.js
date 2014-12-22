"use strict";



define(function () {


    var Message = function (message, date, author) {


        this.getText = function () {
            return message;
        };

        this.setText = function (text) {
            message = text;
        };

        this.getDate = function () {
            return date.toLocaleString();
        };

        this.setDate = function (argDate) {
            date = new Date(parseInt(argDate));
        };

        this.setAuthor = function (auth) {
            author = auth;
        };

        this.getAuthor = function () {
            return author;
        };
    };

    Message.prototype.toString = function () {
        return this.getText() + " ( " + this.getDate() + ")";
    };

    Message.prototype.getHTMLText = function () {
        return this.getText().replace(/\n/g, "<br>");
    };

    Message.prototype.getTime = function () {
        var date = this.getDate();

        function zeroPrefix (number) {
            if (Array.isArray(number)) {
                return number.map(function (n) { return zeroPrefix(n); });
            }
            return (number < 10) ? ("0" + number) : number;
        }

        return zeroPrefix([date.getHours(), date.getMinutes(), date.getSeconds()]).join(":");
    };


    return Message;
});

