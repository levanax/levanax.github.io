---
layout: post  
title:  "Cordova 笔记"  
date:   2019-09-10 10:44:48
categories: 
    - Levan update  
    - Cordova
tags: 
    - Cordova Error Note
keywords: 
    - Cordova Error Note  
---

## 错误1

> 使用 cordova create MyApp 命令时报以下错误：

```cmd
D:\Levana.Xue\temp>cordova create MyApp
Creating a new cordova project.
{ Error: npm: Command failed with exit code 1 Error output:
npm ERR! code ENOLOCAL
npm ERR! Could not install from "..\..\..\Roaming\npm\node_modules\cordova\node_modules\_cordova-app-hello-world@4.0.0@cordova-app-hello-world\index.js" as it does not contain a package.json file.
```

原因：  

> 前段时间更新了 nodejs 版本大升级，一直使用 cnpm 安装相关包，使用未同步升级的 cnpm 安装cordova，然后使用 cordova create app 命令时就会报错  
解决方法
> 使用 npm 安装 cordova, 即可正常创建
