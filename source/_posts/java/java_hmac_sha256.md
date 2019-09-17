---
layout: post  
title:  "Java HmacSHA256加密"  
date:   2019-09-17 14:12:33 
categories: 
    - Levan update  
    - Java
tags: 
    - Java HmacSHA256 
keywords: Java HmacSHA256  
---

## Hmac SHA256加密

> 适用 Java / Android

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

    // https://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java
    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }

    //https://stackoverflow.com/questions/7124735/hmac-sha256-algorithm-for-signature-calculation
    private String HmacSHA256(String content, String salt){
        String result = "";
        try {
            String secret = salt;
            String message = content;

            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] temp = sha256_HMAC.doFinal(message.getBytes());
            result = bytesToHex(temp);
        }
        catch (Exception e){
            System.out.println("Error");
        }
        return result;
    }
```

<!--more -->

[更多参考](https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/)
