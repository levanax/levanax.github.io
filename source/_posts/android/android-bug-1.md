---
layout: post  
title:  "android 添加Recyclerview-v7 库时出错"  
date:   2018-05-17 10:18:51  
categories: Levan update  
tags: android  
keywords: android Recyclerview-v7 error  
---

bug描述:  
添加‘com.android.support:recyclerview-v7:26.0.0-alpha1’库时，rebuild时出错
```
Manifest merger failed : Attribute meta-data#android.support.VERSION@value value=(25.3.0) from [com.android.support:appcompat-v7:25.3.0] AndroidManifest.xml:27:9-31
is also present at [com.android.support:recyclerview-v7:26.0.0-alpha1] AndroidManifest.xml:24:9-38 value=(26.0.0-alpha1).
Suggestion: add ‘tools:replace=“android:value”’ to element at AndroidManifest.xml:25:5-27:34 to override."
```

<!--more -->

解决方法：
link参考：https://forums.bignerdranch.com/t/recyclerview-dependency-error-solved/11751  

I was having the same issue after adding the RecyclerView library which was coming in as version 26.0.0-alpha1.
‘com.android.support:recyclerview-v7:26.0.0-alpha1’

I noticed my Appcompat library was at version 25.3.1
’com.android.support:appcompat-v7:25.3.1’

So I was able to fix the error by updating the AppCompat library to match the RecyclerView version.

Goto Project Structure->app->Dependencies and remove any older AppCompat libraries then click add and search for com.android.support:appcompat-v7 and you should see a newer version that matches the RecyclerView library.

原因：appcompat-v7 版本过低，不兼容recyclerview 库，重新引入同版本库即可。