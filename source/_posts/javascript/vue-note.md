---
layout: post  
title:  "vue 笔记"  
date:   2019-09-25 15:25:21
categories: 
    - Levan update  
tags: 
    - VUE  
keywords: VUE  
---

## 资源收集

打包时用于引入CND的方案  
[webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)

## build时使用CDN遇到的问题1

https://github.com/staven630/vue-cli3-config  

```javascript
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    // 报错: args[0] 没有定义
```

由于使用vue pages配置，按照以上方式使用CDN时，build出错


```javascript
    config.plugin('html-admin').tap(args => {
      args[0].cdn = cdn
      return args
    })
```

使用以上代码替换即可解决，参考链接:[click me](https://github.com/vuejs/vue-cli/issues/1729)  

<!--more -->

...
