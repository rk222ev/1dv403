PWD.apps.ImageViewer = function (params) {

  var id              = params.id,
      appSettings     = {},
      windowSettings  = {},
      picData;

  appSettings.Url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

  windowSettings.id           = id;
  windowSettings.icon         = "pics/icons/ImageViewer.svg";
  windowSettings.titleBarText = "ImageViewer 0.1";

  this.setPicData = function (data) { this.picData = data; };
  this.getPicData = function () { return this.picData; };


  this.window = new PWD.Window(windowSettings);
  this.XHR    = new XMLHttpRequest();
  this.node   = this.window.node.querySelector(".app");


  this.init({
    jsonUrl: appSettings.Url
  });

};


PWD.apps.ImageViewer.prototype.getGalleryJson = function (url) {
  var that = this;

    this.XHR.onreadystatechange = function () {
      that.parseJson(that.XHR);
    };

    this.XHR.open("GET", url);
    this.XHR.send();

};

PWD.apps.ImageViewer.prototype.setAppLoaded = function () {
  this.window.appLoaded();
  this.drawPics();

};


PWD.apps.ImageViewer.prototype.drawPics = function () {
  var appNode = this.node,
      picData = this.getPicData(),
      newDiv = document.createElement("div"),
      widths = picData.map(function (pic) { return pic.thumbWidth; }),
      heights = picData.map(function (pic) { return pic.thumbHeight; }),
      maxImageWidth =  Math.max.apply(null, widths),
      maxImageHeight = Math.max.apply(null, heights);


  picData.forEach( function (pic) {
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



PWD.apps.ImageViewer.prototype.parseJson = function (data) {

  var pics;

  if (data.readyState === 4) {

    if (data.status === 200) {

      //JSON.parse(data.responseText).forEach(function (obj) { pics.push(obj); });
      pics = JSON.parse(data.responseText).map(function (pic) { return pic; });

      this.setPicData(pics);
      this.setAppLoaded();

    } else {
      alert('There was a problem with the request.');
    }
  }
};


PWD.apps.ImageViewer.prototype.init = function (params) {

  this.getGalleryJson(params.jsonUrl);
};



