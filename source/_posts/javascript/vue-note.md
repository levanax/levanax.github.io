---
layout: post  
title:  "vue 笔记"  
date:   2019-09-25 15:25:21
categories: 
    - Levan update  
tags: 
    - VUE  
keywords: VUE  
---

## 资源收集

打包时用于引入CND的方案  
[webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)

## build时使用CDN遇到的问题1 - config.plugin

https://github.com/staven630/vue-cli3-config  

```javascript
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    // 报错: args[0] 没有定义
```

由于使用vue pages配置，按照以上方式使用CDN时，build出错

> vue inspect --plugins // 使用该命令查看 plugin list

```javascript
    config.plugin('html-admin').tap(args => {
      args[0].cdn = cdn
      return args
    })
```

使用以上代码替换即可解决，参考链接:[click me](https://github.com/vuejs/vue-cli/issues/1729)  

<!--more -->

## vue-cli3 分割第三方依赖包

```javascript
const callConfigureWebpack = config => {
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        // async单独打一个包
        async: {
          name: 'async',
          test: /[\\/]node_modules[\\/]async[\\/]/,
          chunks: 'all',
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
  return config
}

module.exports = {
  callConfigureWebpack: callConfigureWebpack
}
```

参考资料:[点我](https://suyi123.com/2018/11/01/vue-cli-3-%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8%E4%B8%8E%E5%88%86%E5%8C%85/)
https://github.com/staven630/vue-cli3-config

## vs code setting

```javascript
"settings": {
  "editor.fontSize": 16,
  "editor.formatOnSave": true,
  "files.associations": {
    "*.vue": "vue"
  },
  "eslint.options": {
    "extensions": [".js", ".vue"]
  }, //去掉代码结尾的分号
  "prettier.singleQuote": true, //使用带引号替代双引号
  "prettier.printWidth": 80,
  "prettier.proseWrap": "always",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false, //让函数(名)和后面的括号之间加个空格
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
    },
    "prettier": {
      "semi": false,
      "singleQuote": true,
      "printWidth": 80,
      "proseWrap": "always"
    }
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[javascript]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```
