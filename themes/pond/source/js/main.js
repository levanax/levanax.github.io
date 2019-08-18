(function() {
  $.when($.ready).then(function() {
    loadBackground(function() {
      setTimeout(function() {
        $(".page-progress").hide();
      }, 500);
    }, this);
  });

  function loadBackground(callback, scope) {
    //取0 几率小
    var imgList = ["bgr_1.jpg"];
    var load_img_i = 0;
    if (imgList.length > 1) {
      load_img_i = Math.ceil(Math.random() * imgList.length - 1);
    }

    var imgSrc = "/imgs/bgr/" + imgList[load_img_i];
    var img = new Image();
    img.onload = function() {
      callback.call(scope);
    };
    img.src = imgSrc;

    var isIE = false;
    try {
      isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    } catch (e) {
      console.error(e);
    }
    var styleStr = [
      "background-size:100% 100%;background-attachment: fixed;background-position: center top;background-image:url(",
      imgSrc,
      ")"
    ].join("");

    if (isIE) {
      $("body").attr("style", styleStr);
    } else {
      var divE = document.createElement("div");
      divE.setAttribute("id", "main-bgr");
      var innerDiv = document.createElement("div");
      innerDiv.setAttribute("style", "height:100%;background: rgba(0,0,0,.4);");
      divE.appendChild(innerDiv);

      $("body").append(divE);
      $("#main-bgr").attr("style", styleStr);
    }
  }
})();
