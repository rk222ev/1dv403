
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
    return this.getText() + "<br>";
};
