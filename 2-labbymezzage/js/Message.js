
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

    //this.getTime = function () {
        //console.log(date);
    //};
}

Message.prototype.toString = function () {
    "use strict";
    return this.getText() + " ( " + this.getDate() + ")";
};

Message.prototype.getHTMLText = function () {
    "use strict";
    return this.getText() + "<br>";
};

Message.prototype.getTime = function () {
    "use strict";
    var date = this.getDate();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
