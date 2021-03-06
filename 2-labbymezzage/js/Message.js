"use strict";

function Message(message, date) {

    this.getText = function () {
        return message;
    };

    this.setText = function (text) {
        message = text;
    };

    this.getDate = function () {
        return date;
    };

    this.setDate = function (argDate) {
        date = argDate;
    };
}

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
