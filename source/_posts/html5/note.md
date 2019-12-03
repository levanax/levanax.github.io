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

## HTML5

### input

```html
<!--- 不被html5后规范采纳的，仅用于解决Iphone 输入框，弹出数字键盘，却又可以在代码中加入逗号用作格式化 --->
<input placeholder="test" id="test" inputmode="decimal" />

<!--- html5 新特性，安卓手机 弹出键盘是可以有小数点的 --->
<input placeholder="test2" id="test2" pattern="[0-9]*" />
```

---

### form表单内 button type=submit

> 注： form表单没有 action 属性，点击 submit同样会触发form 提交方式，URL为当前地址栏URL
>
> 解决方式，点击submit button 时，使用 e.preventDefault(); 阻止默认的from表单提交方式

---

## JavaScript设计模式

资料：[gitbook书籍资源1](https://natee.gitbooks.io/javascript-design-patterns/content/chain-of-responsibility-pattern.html)

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

### 方案1,兼容IE，chrome

```javscript
var timezone = 8; //目标时区时间，东八区
var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
console.log("东8区现在是：" + targetDate);
```

参考链接：[点这里](https://blog.csdn.net/u012193330/article/details/79637660)

### 方案2，不兼容IE

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

> 参考资料：[click me](https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript)  

## http response

[参考资料](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

```nginx
  # 设置缓存
  expires 1d;
  add_header Pragma private;
  add_header Cache-Control "private,no-cache";
```

---

## 谷歌Chrome 浏览器 禁用安全机制

[click me](https://github.com/zhongxia245/blog/issues/28)  
 --disable-web-security --user-data-dir

## 谷歌浏览器缓存变化情况

![20191105101451.png](/assets/2019-11/20191105101451.png)
第一次打开页面时，从服务器下载

![20191105101611.png](/assets/2019-11/20191105101611.png)
退出浏览器后（关闭所有标签页），再次打开时，看到 Size列说明是：读取disk cache

![20191105101623.png](/assets/2019-11/20191105101623.png)
不关闭浏览器，刷新时，说明 memory cache（因为js文件已经加载进内存  

*prefetch cache，是html5 缓存标签，表示该文件在浏览器空闲时，预先加载该文件

---

## 浏览器使用缓存时，与服务端文件比对的两个关键属性

last Modify  
文件一共有两个时间：创建时间 与 最后修改时间(Last modify)  
复制文件时，只会改变创建时间，最后修改时间不会改变  

E-TAG  
相当于文件的指纹，如文件未发生变更，E-TAG 不会发生改变  

---
