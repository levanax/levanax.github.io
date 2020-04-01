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

## 遇到的问题列表

### 使用 cordova create MyApp 命令时报以下错误

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

<!--more -->

---

### jpg 改 png

> app 内图标需png类型，但客户给出jpg，因此需要改为png
> 直接更改后缀为png
> 1.cordova Android 无法打包
> 2.cordova ios 可以正常打包，但是无法通过apple 审核上架
> 解决：需从程序方面转为png类型后正常

---

### Cordova IOS input.focus() 无法弹出键盘

参考: https://stackoverflow.com/questions/11843166/document-getelementbyidmycontrol-focus-not-working-in-phonegap?newreg=032c0e6c544b4e14a8d4b5d80cac1f7b  

```xml
# https://cordova.apache.org/docs/en/5.1.1/guide/platforms/ios/config.html
<preference name="KeyboardDisplayRequiresUserAction" value="false"/>
# KeyboardDisplayRequiresUserAction（布尔值，默认为true）：设置为false允许在调用focus()表单输入时出现键盘
```

---
