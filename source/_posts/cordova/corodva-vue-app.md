---
layout: post  
title:  "cordova + vue 开发 Mobile app"  
date:   2019-05-16 16:04:24
categories: Levan update  
tags: vue cordova
keywords: cordova vue  
---

# 技术框架  

cordova 9.0.0 (cordova-lib@9.0.1)   
vue-cli3 ,vue^2.6.10

## 遇到的问题记录

1. 使用 vue build + cordova build android 后，在手机上运行，出现一片白屏后无反应  
解决办法：  
在 vue.config.js 增加配置项如下
```javascript
  baseUrl: 'android_asset/www/'
```

<!--more -->

2. 正常打开app后，页面加载未达到预期
```javascript
    {
      path: '/',
      name: 'home',
      component: Home
    }
```
以上代码应该是要加载 Home 组件，但未加载，需要人手点击才加载成功  
解决办法：  
请检查 router 是否 使用 history 模式，由于Mobile端非服务器，未支持history模式，将该代码移除即可
```javascript
mode: 'history'
```