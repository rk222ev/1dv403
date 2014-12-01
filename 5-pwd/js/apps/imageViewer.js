PWD.apps.ImageViewer = function (params) {

  var id              = params.id,
      appSettings     = {},
      windowSettings  = {},
      picData;

  appSettings.Url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";

  windowSettings.id           = id;
  windowSettings.icon         = "pics/icons/ImageViewer.svg";
  windowSettings.titleBarText = "ImageViewer 0.1";
  windowSettings.width        = params.width || 600;
  windowSettings.height       = params.height || 460;

  this.setPicData = function (data) { this.picData = data; };
  this.getPicData = function () { return this.picData; };


  this.window = new PWD.Window(windowSettings);
  this.XHR    = new XMLHttpRequest();
  this.node   = this.window.node.querySelector(".app");


  this.init({
    jsonUrl: appSettings.Url,
    picUrl: params.picUrl
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


PWD.apps.ImageViewer.prototype.click = function (e, pic) {
  var settings = {};

 e.cancelBubble = true;

 settings.id = new Date().getTime();
 settings.picUrl = pic.URL;
 settings.height = pic.height + 50;
 settings.width = pic.width + 20;

  PWD.desktop.openWindows[settings.id] = new PWD.apps.ImageViewer(settings);
  return true;
};


PWD.apps.ImageViewer.prototype.drawPics = function () {
  var appNode = this.node,
      picData = this.getPicData(),
      newDiv = document.createElement("div"),
      widths = picData.map(function (pic) { return pic.thumbWidth; }),
      heights = picData.map(function (pic) { return pic.thumbHeight; }),
      maxWidth =  Math.max.apply(null, widths),
      maxHeight = Math.max.apply(null, heights);


  picData.forEach( function (pic) {
    var that = this,
        div = document.createElement("div"),
        a = document.createElement("a"),
        img = document.createElement("img");


    img.setAttribute("src", pic.thumbURL);
    a.appendChild(img);

    a.setAttribute("href", "#");
    div.appendChild(a);

    div.classList.add("gallery-pic");
    div.style.width = maxWidth + "px";
    div.style.height = maxHeight + "px";
    div.addEventListener("mousedown", function (e) {
      PWD.apps.ImageViewer.prototype.click(e, pic);
    });

    newDiv.appendChild(div);
  });

  appNode.appendChild(newDiv);
};



PWD.apps.ImageViewer.prototype.parseJson = function (data) {

  var pics;

  if (data.readyState === 4) {

    if (data.status === 200) {

      pics = JSON.parse(data.responseText).map(function (pic) { return pic; });

      this.setPicData(pics);
      this.setAppLoaded();

    } else {
      alert('There was a problem with the request.');
    }
  }
};

PWD.apps.ImageViewer.prototype.drawPic = function (url) {
  var img = document.createElement("img") ;

  img.setAttribute("src", url);
  this.node.appendChild(img);
};


PWD.apps.ImageViewer.prototype.init = function (params) {

  if (params.picUrl) {
    this.drawPic(params.picUrl);
    this.window.appLoaded();

  } else {
    this.getGalleryJson(params.jsonUrl);

  }
};



