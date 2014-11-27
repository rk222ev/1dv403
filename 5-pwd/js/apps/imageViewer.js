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

  var appNode = PWD.desktop.openWindows[this.getWindowId()].node.querySelector(".app"),
    newDiv = document.createElement("div"),
    widths = this.readData.map(function (pic) { return pic.thumbWidth; }),
    heights = this.readData.map(function (pic) { return pic.thumbHeight; }),
    maxImageWidth =  Math.max.apply(null, widths),
    maxImageHeight = Math.max.apply(null, heights);


  PWD.desktop.openWindows[this.getWindowId()].appLoaded();


  console.log(widths);
  this.readData.forEach( function (pic) {
    var div = document.createElement("div"),
      a = document.createElement("a"),
      img = document.createElement("img");


    img.setAttribute("src", pic.thumbURL);
    a.appendChild(img);

    a.setAttribute("href", "#");
    div.appendChild(a);

    div.classList.add("gallery-pic");
    div.style.width = maxImageWidth + "px";
    div.style.height = maxImageHeight + "px";

    newDiv.appendChild(div);
  });

  appNode.appendChild(newDiv);
};
