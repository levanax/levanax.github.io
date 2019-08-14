---
layout: post  
title:  "https 单/双向认证"  
date:  2019-08-07 16:53:13
categories: Levan update  
tags: https 
keywords: https
---

```cmd
生成服务端证书
keytool-genkey -v -alias server -keyalg RSA -storetype PKCS12 -keystore E:\7\server.key.p12

导出证书公钥，安装到客户端
keytool-keystore E:\7\server.key.p12 -export -alias server -file E:\7\server.cer
```

参考：https://blog.csdn.net/weixin_41917987/article/details/80987835  

<!--more -->


```cmd
生成客户端证书文件
keytool -genkey -v -alias testclient -keyalg RSA -storetype PKCS12 -keystore testclient.key.p12

首先导出客户端证书的公钥文件
keytool -keystore testclient.key.p12 -export -alias testclient -file testclient.cer

将公钥文件导入信任库
keytool -import -v -file testclient.cer -keystore server.key.p12
```

参考：https://blog.csdn.net/weixin_41917987/article/details/80988197