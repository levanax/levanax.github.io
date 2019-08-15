---
layout: post  
title:  "nginx 笔记"  
date:   2019-08-15 11:51:15
categories: Levan update  
tags: nginx
keywords: nginx
---

配置：  
https://www.nginx.com/resources/wiki/start/topics/examples/full/#  

### 问题1

```conf

if($domain = "test") {}

```

上面代码会报错 nginx unknown directive "if( ，导致无法启动

```conf
if ($domain = "test") {}
```

解决方法： 在 if 后面添加一个空格，另外注意，如果是字符串需要 双引号包起来。  
*if 不赞成使用，具体请参考：https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/#why-this-happens-and-still-not-fixed


<!--more -->