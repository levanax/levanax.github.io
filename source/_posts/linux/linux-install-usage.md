---
layout: post  
title:  "Linux 安装以及使用"  
date:   2019-10-08 18:43:15
categories: 
    - Levan update
    - Linux
tags: 
    - Linux安装以及使用
keywords: Linux
---

## 下载 Linux系统

下载请点击：[这里](https://www.linux.org/pages/download/)  

由于 Linux系统版本较多，我选择的是 [ubuntu](https://ubuntu.com/download)

## 问题

---

### linux apt-get 无法获得锁

> 使用 apt-get 安装 yum 时报错：无法获得锁，如下图

![eg img](/assets/linux/linux-error1.png)

```cmd
rm -rf  /var/cache/apt/archives/lock
rm -rf  /var/lib/dpkg/lock
```

参考资料：[点我](https://blog.csdn.net/legendaryhaha/article/details/89361120)

---

<!--more -->

## yum install docker -y 没有已启用的仓库

> yum 是linux 的包管理器，由于 ubuntu linux使用的包管理器是 apt / apt-get，所以若要使用需要按提示来操作

---

## 安装 docker

参考资料：  

1. [资料1](https://philipzheng.gitbooks.io/docker_practice/content/install/ubuntu.html)  
2. [资料2](https://yeasy.gitbooks.io/docker_practice/install/ubuntu.html)

...
