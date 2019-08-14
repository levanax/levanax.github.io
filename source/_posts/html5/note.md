---
layout: post
title: html5 & javascript 笔记
date: 2019-05-14 10:53:16
categories: Levan update
tags: html5 javascript
keywords: html5 javascript
---

# html5 + javascript

## 文件下载

```javascript
var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://192.168.7.128:8080/download');
xhr.onprogress = function(e) {
  if (e.lengthComputable) {
    console.log(e.loaded + ' / ' + e.total);
  }
};
xhr.onloadstart = function(e) {
  console.log('start');
};
xhr.onloadend = function(e) {
  console.log('end');
};
xhr.send({
  form: JSON.stringify({
    id: 1
  })
});
```

```javascript
/**
 * PC 文件下载
 * @param {Object} params
 * @param {Blob} params.blob
 * @param {String} params.fileName
 */
export function fileDownload(params) {
  const uA = window.navigator.userAgent
  const isIE =
    /msie\s|trident\/|edge\//i.test(uA) &&
    !!(
      'uniqueID' in document ||
      'documentMode' in document ||
      'ActiveXObject' in window ||
      'MSInputMethodContext' in window
    )
  const isEdge = uA.indexOf('Edge') > -1

  if (isIE || isEdge) {
    navigator.msSaveBlob(params.blob, params.fileName)
  } else {
    const url = window.URL.createObjectURL(params.blob)
    const link = document.createElement('a')
    link.setAttribute('style', 'display:none')
    link.setAttribute('id', 'download')
    link.setAttribute('href', url)
    link.setAttribute('download', params.fileName)
    document.body.appendChild(link)
    link.click()
    link.addEventListener('click', function() {
      URL.revokeObjectURL(url)
      document.getElementById('download').remove()
    })
  }
}
```
<!--more -->

## 跨域问题
如跨域在Chrome正常，火狐浏览器提示  
firefox with reason: CORS header 'Access-Control-Allow-Origin' does not match 'http://localhost:4200, *').  
则应检查 火狐浏览器是否有安装 cors 相关插件  
参考链接：firefox with reason: CORS header 'Access-Control-Allow-Origin' does not match 'http://localhost:4200, *').  


## IE 站点图标无法切换问题
参考链接：https://stackoverflow.com/questions/29404559/how-to-force-ie11-to-request-a-new-favicon
html
```html
<link rel="icon" type="image/x-icon" href="resources/favicon.ico">
```
javascript
```javascript
// Chrome allows you to simply tweak the HREF of the LINK tag.
// Firefox appears to require that you remove it and readd it.
function setFavicon(url)
{
    removeFavicon();
    var link=document.createElement('link');
    link.type='image/x-icon';
    link.rel='icon';
    link.href=url;
    document.getElementsByTagName('head')[0].appendChild(link);
    if (window.console) console.log("Set FavIcon URL to " + getFavicon().href);
 }

function removeFavicon()
{
    var links=document.getElementsByTagName('link');
    var head=document.getElementsByTagName('head')[0];
    for(var i=0; i<links.length; i++)
    {
        if(links[i].getAttribute('rel')==='icon'){
             head.removeChild(links[i])
        }         
    }      
}
```