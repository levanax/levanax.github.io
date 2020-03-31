---
layout: post  
title:  "JavaScript 笔记"  
date:   2020-3-31 14:09:34
categories: 
    - Levan update  
tags: 
    - JavaScript 笔记  
keywords: JavaScript 笔记 
---

## 遇到的问题列表

---

### new Date().getTime() 时间戳

> 参考资料：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
> *这个 getTime 获取到的时间戳 ，都是 格林威治时间数值，所以这个数值使用的 格林威治时区的时间，当服务端与客户端交互时，做时间差比对时，不需要转换为服务器端时区时间 来执行 getTime

<!--more -->

---

### setTimeout() setInterval() 定时器问题 & 注意点

![setTimeout-desc.png](/assets/2020-3-31/setTimeout-desc.png)
![setInterval-desc.png](/assets/2020-3-31/setInterval-desc.png)

---
