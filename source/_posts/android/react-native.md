---
layout: post
title: 'react-native note'
date: 2018-07-25 21:50:12
categories: Levan update
tags: hybird app
keywords: react-native expo
---

https://facebook.github.io/react-native/docs/getting-started.html

<!--more -->

# react debug

## step 1

https://github.com/facebook/react-devtools/blob/master/packages/react-devtools/README.md  
使用命令

```cmd
$npm install -g react-devtools

// 打开 react 调试工具
$react-devtools
```

## step2

1 使用火狐浏览器，安装 扩展 https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

## step3

```cmd
expo start
```

启动项目，使用 expo app 打开 app， 摇晃手机开启调试

# 常见问题

问题 1 ：

1. 使用 exop start/ npm start 后， LAN url = exp://169.254.80.80:19000 时，在手机上使用 Expo app 打开 提示 no response!!!

解决方法：留意电脑 网络连接是否存在 出本地连接之外的 虚拟网卡连接，把 IP 为 169.254.80.80 的连接 禁用掉，即可解决
