---
layout: post  
title:  "Sentry note"  
date:   2019-10-09 13:58:09
categories: 
    - Levan update
    - System Runing Exception Manager
tags: 
    - Sentry
keywords: Sentry  
---
## 指南

[Sentry安装指南](https://docs.sentry.io/server/installation/docker/)

## Sentry 教程

参考资料：  
[Sentry 安装部署教程](https://juejin.im/post/5b55c33ae51d45198f5c7a91)  
[Sentry vue 结合使用教程](https://juejin.im/post/5cc2b8b9e51d456e40377319)

<!--more -->

```cmd
sentry-cli releases -o levan-b9 -p vuedemo new test@1.0.0

#-o levan-b9   -o 组织名称
#-p vuedemo 项目名称
#test@1.0.0    Sentry.init({ release 版本标记})

```

```cmd
#sentry-cli releases -o 组织 -p 项目 delete test@1.0.0
# 新建项目版本标记
$sentry-cli releases -o levan-b9 -p vuedemo new test@1.0.0

#-o levan-b9   -o 组织名称
#-p vuedemo 项目名称
#test@1.0.0    Sentry.init({ release 版本标记})
```

```cmd
#sentry-cli releases -o 组织 -p 项目 files test@1.0.0 upload-sourcemaps js文件所在目录 --url-prefix 线上资源URI

# 上传map文件
$sentry-cli releases -o levan-b9 -p vuedemo files test@1.0.0 upload-sourcemaps  D:/Levana.Xue/develop-tool/nginx-1.14.0/app-esop/web/js  --url-prefix ~/web/js/

#-o levan-b9,   -o 组织名称
#-p vuedemo, 项目名称
# D:/Levana.Xue/develop-tool/nginx-1.14.0/app-esop/web/js, JS文件路径
#--url-prefix ~/web/js/ ,用户使用的网址，js文件前缀路径，~ 表示对应相对路径
```

...
