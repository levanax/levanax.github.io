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

## 说明

阿里云镜像 [https://opsx.alibaba.com/mirror](https://opsx.alibaba.com/mirror)

---

### 命令行符号 “\”

![linux-cmd-desc1.png](/assets/linux/linux-cmd-desc1.png)

> 以"\"结尾 （如上图）
> 该符号是告知命令窗口，该命令还没有输入完成，换行继续输入。常用于 cmd 命令过长时使用

---

<!--more -->

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

### yum install docker -y 没有已启用的仓库

> yum 是linux 的包管理器，由于 ubuntu linux使用的包管理器是 apt / apt-get，所以若要使用需要按提示来操作

### 安装 docker, gpg密钥时问题

![linux/linux-install-docker-error1](/assets/linux/linux-install-docker-error1.png)

---

## docker

### 安装

参考资料：  

1. [资料1](https://philipzheng.gitbooks.io/docker_practice/content/install/ubuntu.html)  
2. [资料2](https://yeasy.gitbooks.io/docker_practice/install/ubuntu.html)

#### sources.list格式有误

![linux/linux-source-list-error-20191022191756](/assets/linux/linux-source-list-error-20191022191756.png)

#### sources.list镜像修改

![linux/linux-source-list2019-10-22-191655](/assets/linux/linux-source-list2019-10-22-191655.png)

### 使用

```cmd
# su 获得root权限后
systemctl start docker --启用服务
docker info -- 查看docker信息
```

## docker-compose

> Compose 定位是“定义和运行多个 Docker 容器的应用”
> 例如要实现一个 Web 项目，除了 Web 服务容器本身，往往还需要再加上后端的数据库服务容器，甚至还包括前端的负载均衡容器等

### install

> *需先安装 python

![linux/20191027160118](/assets/linux/20191027160118.png)
![linux/20191027160022](/assets/linux/20191027160022.png)

```cmd

$sudo apt install python-pip

// -U 平滑升级，当前版本稳定升级，第一次安装时，把 -U 移除
$sudo pip install -U docker-compose


```

---

## git版本管理工具

### 安装git

资料：[戳我](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Git-Extensions

资料：[戳我](https://github.com/gitextensions/gitextensions/wiki/How-To:-run-Git-Extensions-on-Linux)

...
