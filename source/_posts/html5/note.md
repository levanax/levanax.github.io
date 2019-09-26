---
layout: post
title: html5 & javascript 笔记
date: 2019-05-14 10:53:16
categories: 
  - Levan update
  - Web
tags:
  - 'html5'
  - 'javascript日志'
keywords: html5 javascript
---

## 素材库

图标素材库：[阿里图标库](https://www.iconfont.cn)  

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

## JavaScript编码

```javascript
let RESERVED_CHAR_SET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.~_'

function get_normalized_char(b) {
  let result = new Map()
  for (let i = 0; i < 256; i++) {
    // 转ASCII码，跟java， Char temp =  (char)i ; 一样
    let c = String.fromCharCode(i)
    if (!b && c === '/') {
      continue
    }
    if (RESERVED_CHAR_SET.indexOf(c) !== -1) {
      result.set(c, c)
    } else {
      // 转16进制
      let temp = i.toString(16).toUpperCase()
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
      result.set(c, '%' + temp.padStart(2, '0'))
    }
  }
  return result
}

window.encodString = function(path, b) {
  let length = path.length
  let result = ''
  let encode_f = get_normalized_char(b)

  for (let i = 0; i < length; i++) {
    if (path.charAt(i) === '/' && !b) {
      result += '/'
    }
    let c = encode_f.get(path.charAt(i))
    if (!c) {
      continue
    }
    result += c
  }
  return result
}
```

## 获取指定时区时间（中国）

```javascript
// 获取北京时间，毫秒数
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
Date.parse(new Date().toLocaleString("en", {timeZone: "Asia/Shanghai", timeZoneName: 'short'}))

// e.g.
var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
aestTime = new Date(aestTime);
console.log('AEST time: '+aestTime.toLocaleString())

var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
asiaTime = new Date(asiaTime);
console.log('Asia time: '+asiaTime.toLocaleString())

var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
usaTime = new Date(usaTime);
console.log('USA time: '+usaTime.toLocaleString())

var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
indiaTime = new Date(indiaTime);
console.log('India time: '+indiaTime.toLocaleString())
```

> 参考资料：https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript  

## http response

[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

```nginx
  # 设置缓存
  expires 1d;
  add_header Pragma private;
  add_header Cache-Control "private,no-cache";
```
