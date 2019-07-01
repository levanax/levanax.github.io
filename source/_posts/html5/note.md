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
