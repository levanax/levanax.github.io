---
layout: post  
title:  "Linux常用命令"  
date:   2019-05-15 16:43:52
categories: 
    - Levan update
    - Linux
tags: Linux常用命令
keywords: Linux常用命令  
---

## 常用命令

### 新建

```cmd
# 在当前目录下新建 test 文件夹
$mkdir test
```

### 查找

#### 简单查找

```cmd
$ls -l 
 - 简写为ll -查看目录下文件

$less file
? 向上查找
/ 向下查找

n 使用查找后,跳到下个匹配位置
N 跳至上一个匹配位置

```

#### 正则表达式搜索文件

```cmd
$egrep -i -a1 'loadWithdrawalacc[a-zA-Z -]+0324'  2goportal.log
 -i 忽略大小写
 -b1 匹配前一行
 -a1 包含被匹配后一行

```

```cmd
su  #进入root权限
exit #退出su 进入的root权限
su test #切换用户为 test

```

### 编辑  

```cmd
vi /test.txt
:%s/aaa/bbb/g  #批量替换 aaa 为 bbb
```
<!--more -->

### 比较文件内容

```cmd
diff a.txt b.txt
```

## 笔记

### root密码

![eg img](/assets/linux/linux-sudo-root-password-cmd.png)

```cmd
// 新系统还没有root 账户, 使用下面命令创建root 密码
$sudo passwd root
```
