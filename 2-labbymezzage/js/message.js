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
