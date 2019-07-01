---
layout: post  
title:  "maven资料"  
date:   2018-06-12 11:45:02  
categories: Levan update  
tags: maven
keywords: maven  
---
 java项目转 maven：  
 https://www.tianmaying.com/tutorial/eclipse-maven-project

<!--more -->
java手动转 maven项目 ，右击项目 maven ->> update maven project -->> bug1:  
![error info](error1.png "bug1 img")  
ref:https://stackoverflow.com/questions/10838109/eclipse-build-path-nesting-errors/15411137
原因是：pom.xml
```
<build>
        <sourceDirectory>src</sourceDirectory>
```
把 ~~<sourceDirectory>src</sourceDirectory>~~ 删除即可