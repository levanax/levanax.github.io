---
layout: post  
title:  "visual studio emulator android note"  
date:   2018-07-25 21:50:25 
categories: Levan update  
tags: android模拟器 
keywords:  android模拟器
---

官网：[https://visualstudio.microsoft.com/vs/msft-android-emulator/](https://visualstudio.microsoft.com/vs/msft-android-emulator/)
  

##### Android 模拟器与 Android studio 连接调试
  
资料参考  
中文：https://blogs.msdn.microsoft.com/devops/2015/07/20/using-the-visual-studio-emulator-for-android-from-android-studio-or-eclipse-with-adt/
  
英文：[https://blog.csdn.net/SilenceOO/article/details/77518665](https://blog.csdn.net/SilenceOO/article/details/77518665)  
  
Android模拟器无法联网：[https://blog.csdn.net/s562218/article/details/50375079](https://blog.csdn.net/s562218/article/details/50375079)

  
遇到问题， SDK 23版本无法启动，其他都可以

<!-- more -->

如果卸载了，无法启动, To fix this I:
- opened Hyper-V Manager  
- Went to Virtual Switch Manager on the Right hand pane  
- Deleted all Virtual Switches
- Then opened Visual Studio Emulator
- Deleted all Android Emulators
- Uninstalled / Reinstalled Android Emulator for Visual Studio
- Openened Reinstalled Visual Studio Emulator
- Downloaded an Emulator and Ran and it worked again  

如何打开Hyper-V manager, WIN10 请按 WIN键后，输入 HY 搜索，即出现Hyper-v... 程序