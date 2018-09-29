(function() {
    $.when($.ready).then(function() {
      loadBackground()
    })
  
    function loadBackground() {
      //取0 几率小
      var imgList = ['about_1.jpg']
      var load_img_i = 0
      if (imgList.length > 1) {
        load_img_i = Math.ceil(Math.random() * imgList.length - 1)
      }
      var divE = $('#main-bgr');  
      var isIE = false;
      try{
        isIE = !!window.ActiveXObject || "ActiveXObject" in window;
      }catch(e){console.error(e)}
      if(isIE){
        $('body').attr(
          'style',
          ['background-size:100% 100%;background-attachment: fixed;background-position: center top;background-image:url(/imgs/about/', imgList[load_img_i], ')'].join('')
        )
      }else{
        $('#main-bgr').attr(
          'style',
          ['background-size:100% 100%;background-attachment: fixed;background-position: center top;background-image:url(/imgs/about/', imgList[load_img_i], ')'].join('')
        )
      }
    }
  })()
  