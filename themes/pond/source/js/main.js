;(function() {
  $.when($.ready).then(function() {
    loadBackground()
    $('.page-progress').hide();
  })

  function loadBackground() {
    //取0 几率小
    var imgList = ['FringeFireworks_1920x1080.jpg', 'FringeFireworks_1920x1080.jpg', 'FishingWarehouses_1920x1080.jpg', 'Kolonihavehus_1920x1080.jpg']
    var load_img_i = 0
    if (imgList.length > 1) {
      load_img_i = Math.ceil(Math.random() * imgList.length - 1)
    }
    var divE = document.createElement('div')
    divE.setAttribute('id', 'main-bgr')
    var innerDiv = document.createElement('div')
    innerDiv.setAttribute('style', 'height:100%;background: rgba(0,0,0,.4);')
    divE.appendChild(innerDiv)

    $('body').append(divE)

    var isIE = false;
    try{
      isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    }catch(e){console.error(e)}
    if(isIE){
      $('body').attr(
        'style',
        ['background-size:100% 100%;background-attachment: fixed;background-position: center top;background-image:url(/imgs/bgr/', imgList[load_img_i], ')'].join('')
      )
    }else{
      $('#main-bgr').attr(
        'style',
        ['background-size:100% 100%;background-attachment: fixed;background-position: center top;background-image:url(/imgs/bgr/', imgList[load_img_i], ')'].join('')
      )
    }
  }
})()
