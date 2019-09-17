---
layout: post  
title:  "Cordova Plugin"  
date:   2019-09-16 15:46:22
categories: 
    - Levan update  
    - Cordova
tags: 
    - Cordova Plugin
keywords: Cordova Plugin  
---

背景：

[参考资料](https://juejin.im/post/5b3888bfe51d455885771005)

<!--more -->

```cmd
# 安装用于 开发cordova plugin 的工具， https://github.com/apache/cordova-plugman#readme
npm install -g plugman

# 查看帮助
D:\Levana.Xue\privateWorkspace\TEMP>plugman create -h
Create a plugin

Usage: plugman create PARAMETER... [OPTION]...

Parameters:
  --name <pluginName>           The name of the plugin
  --plugin_id <pluginID>        An ID for the plugin, ex: org.bar.foo
  --plugin_version <version>    A version for the plugin, ex: 0.0.1

Options:
  --path <directory>            An absolute or relative path for the directory
                                where the plugin project will be created
  --variable NAME=VALUE         Extra variables such as description or Author


# 创建插件
plugman create --name test --plugin_id top.xue.test --plugin_version 0.0.1

cd test

# 添加Android 平台
plugman platform add --platform_name  android

# 创建 package.json，创建package.json后才可以使用cordova命令安装
npm init

```

```cmd
plugman create --name cordova-plugin-signature-check --plugin_id top.xuebiao.signature_check --plugin_version 0.0.1

```
