PWD.apps.ImageViewer = function (windowId) {
  var that = this;

  this.icon = "pics/icons/image.svg";

  this.getWindowId = function () { return windowId; };

  // this.appNode = (function () { PWD.desktop.openWindows[that.getWindowId()].node.querySelector(".app"); })();

  this.ajaxRequest = new XMLHttpRequest();

  this.readData = [];


  this.init();

};


PWD.apps.ImageViewer.prototype.init = function () {
  var that = this;

  this.ajaxRequest.onreadystatechange = function () { that.pics = that.parseJson(that.ajaxRequest); };

  this.ajaxRequest.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/");
  this.ajaxRequest.send();

};

PWD.apps.ImageViewer.prototype.parseJson = function (data) {
  var that = this;

  if (data.readyState === 4) {
    if (data.status === 200) {
      JSON.parse(data.responseText).forEach(function (obj) { that.readData.push(obj); });
      this.drawPics();

    } else {
      alert('There was a problem with the request.');
    }
  }
};

PWD.apps.ImageViewer.prototype.drawPics = function () {
  PWD.desktop.openWindows[this.getWindowId()].appLoaded();

  var appNode = PWD.desktop.openWindows[this.getWindowId()].node.querySelector(".app");
  var newDiv = document.createElement("div");



  this.readData.forEach( function (pic) {
    var img = document.createElement("img");

    img.setAttribute("src", pic.thumbURL);

    newDiv.appendChild(img);
  });

  appNode.appendChild(newDiv);
};
