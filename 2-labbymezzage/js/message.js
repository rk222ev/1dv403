
function Message(message, date) {
    "use strict";

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
    "use strict";
    return this.getText() + " ( " + this.getDate() + ")";
};

Message.prototype.getHTMLText = function () {
    "use strict";
    return this.getText().replace(/\n/g, "<br>");
};

Message.prototype.getTime = function () {
    "use strict";
    var date = this.getDate(),
        zeroPrefix = function (number) {
            if (Array.isArray(number)) {
                zeroPrefix(number[0]);
            }
            return (number < 10) ? ("0" + number) : number;
        };

    return zeroPrefix([date.getHours(), date.getMinutes(), date.getSeconds()]).join(":");
};
