---
layout: post  
title:  "tomcat"  
date:   2018-07-26 11:16:49
categories: Levan update  
tags: tomcat 
keywords: tomcat  
---


Jul 26, 2018 11:01:02 AM org.apache.catalina.core.StandardContext startInternal
SEVERE: One or more Filters failed to start. Full details will be found in the appropriate container log file
Jul 26, 2018 11:01:02 AM org.apache.catalina.core.StandardContext startInternal
SEVERE: Context [] startup failed due to previous errors
web exit ... 
<!--more -->

原因：WEB-INF/lib/ 下 jar包重复。
  
