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

### ng config 使用if出错导致无法正常启动

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

### nginx 配置静态资源cdn 出现404

---

问题代码如下：

```conf
location ^~/cdn/ {
    root   cdn;
}
```

> 由于 url 为 http:ip:port/cdn/xxx/index.js
> 但是rott 配置为 cdn目录， $uri = /cdn/xxx/index.js
> nginx 在cdn目录下无法找到 $uri，所以一直报404

正确配置如下：

```conf
location ^~/cdn/ {
    # 将cdn目录移至 test目录内
    root   test;
}
```

---

### nginx配置代理

```config
http {
    upstream mobile_dev_server {
       server 127.0.0.1:8085;
       keepalive 2000;
   }
    server {
        listen       8282;
        server_name  localhost;

        location ^~/mobile {
          proxy_pass http://mobile_dev_server/mobile;
          proxy_set_header Host $host:$server_port;
        }
    }
}
```

> 127.0.0.1:8282/mobile 跳转至 127.0.0.1:8085/mobile

---

### nginx挂载目录浏览

```conf
	server {
        listen       4445;
        server_name  localhost;

        #charset koi8-r;
        charset utf-8;
		location / {
            root D:/Levana.Xue/Mobile-App-APK-Code-Backup; #指定实际目录绝对路径
            autoindex on;                        #开启目录浏览功能
            autoindex_exact_size off;            #关闭详细文件大小统计，让文件大小显示MB，GB单位，默认为b
            autoindex_localtime on;              #开启以服务器本地时区显示文件修改日期!
        }
    }
```

---