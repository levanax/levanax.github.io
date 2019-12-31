---
layout: post  
title:  "node 笔记"  
date:   2018-05-18 12:59:49 
categories: Levan update  
tags: node  
keywords: node笔记
---

nrm: npm下载管理工具  

前端web项目测试工具：  
[点这里](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Continuous-Integration)

<!--more -->

## 依赖包升级工具

### npm-check-updates

link: [点这里](https://github.com/tjunnone/npm-check-updates)

### npm-check

link: [点这里](https://github.com/dylang/npm-check)

---

## BUG

### cannot download node-sass,http 404 not found

#### 问题描述

![bug20191231104125](/assets/2019-12-31/bug20191231104125.png)
![bug20191231104330](/assets/2019-12-31/bug20191231104330.png)

Cannot download "https://github.com/sass/node-sass/releases/download/v4.11.0/win32-x64-72_binding.node":
HTTP error 404 Not Found  

#### 原因

![20191231104605](/assets/2019-12-31/20191231104605.png)
由于近期更新过node版本，node-sass需要与node版本相对应  

> 更新日期：2019-12-31

---
