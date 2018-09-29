hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data');
    if(data && data.config){
    	 hexo.theme.config = Object.assign(hexo.theme.config, data.config);
    }
  }
})