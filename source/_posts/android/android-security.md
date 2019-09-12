---
layout: post  
title:  "Android apk 防止篡改"  
date:   2019-09-12 10:46:55
categories: 
    - Levan update  
    - Android
tags: 
    - Android Security
keywords: 
    - Android Security  
    - Android apk 防止篡改
---

背景：android版 app 被二次打包，功能可以正常使用，不法分子将恶意代码嵌入，导致数据不安全问题。  

Cordova App 的主要源码为 assets文件夹 下HTML（资源文件）  

所以我们需要的加密防止篡改只需要保护 和确认 assets文件夹未被修改过即可  

## assets 资源防篡改付费方案(2019-9-12)

腾讯乐固仅企业版支持,收费：

|  APP个数  | 年     |  价格  |
| :---      | ---:   | ----: |
|   1       |   1    |    8w |

360加固,收费：

|  APP个数  | 年     |  价格  |
| :---      | ---:   | ----: |
|   1       |  1     |   1.8w (*现在是5折)|

<!--more -->
## 其他

### 思路

1. 加密assets文件  

2. https 双向认证，就需要保护apk端 https证书

3. 校验apk 签名正常后方可使用

4. 参考链接 [参考](https://blog.csdn.net/qq_32452623/article/details/54351364)  
