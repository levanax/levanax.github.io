(function($) {
  $.when($.ready).then(function() {
    //文章目录固定
    var tocDom = $('#postToc');
    if (tocDom) {
      var top = $('nav').height();

      tocDom.pushpin({
        top: top,
        right: 0,
        // buttom: 10,
        offset: 0
      });
      //tocDom.css('width', tocDom.parent().width());
    }

    var postContentDom = $('#postContent');
    if (postContentDom) {
      // $('#postContent h1').scrollSpy();
      // $('#postContent h2').scrollSpy();
      // $('#postContent h3').scrollSpy();
      // $('#postContent h4').scrollSpy();
      // $('#postContent h5').scrollSpy();
    }
  });
})(jQuery);
