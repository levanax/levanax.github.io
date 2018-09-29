---
layout: post
title: "Sencha Touch 编码约定"
date: 2017-10-29
categories: Levan update
tags: Sencha touch
---


## 编码
- Javascript编码规范  
https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md
- css 编码规范  
https://github.com/ecomfe/spec/blob/master/css-style-guide.md
- sass 规范  
参考： https://sass-guidelin.es/zh/

## 命名补充
- 文件名必须以大写字母打头
- class名，必须按文件路径  
e.g. app/view/test/Test.js == appName.view.test.Test
- view 文件夹下 xtype 以小写字母打头，且带有小尾巴 -View   
e.g.  xtype:'testView'  
- alternateClassName 也必须以大写字母开头
- 日期时间使用格式 "201703241148Z" 2017年3月24日11点48分 尾巴Z是跟CG API

<!-- more -->
## 注释编写
参考：  
https://github.com/senchalabs/jsduck/wiki  

```javascript
e.g.（摘自mobile代码，但有所改动）
     /**
     * @method putOnRecord 登入作记录, 会把其它用户 status ，更改为offline
     * @param brokerID {String} 券商ID
     * @param loginID {String} 登入名
     * @param deviceModel {String} 设备信息
     * @param uuid {String} 
     * @param authorization {String}
     * @param networkIP {String}
     * @param lastChangePasswordTime {String} 最后更新密码时间，e.g. "2016-12-22T16:15:30Z || 61"
     * @return {Ext.data.Model}
     */
    function putOnRecord(brokerID, loginID, deviceModel, uuid, authorization, networkIP, lastChangePasswordTime) {
        //doing something...
    }
    
    
    /**
     * @method updateDataByAllMkt 更新全部市场价格区间数据
     * @param data {Object}
     * @param data.mktCodes {String | Array} 市场代号
     * @param callback {Function} 回调函数
     * @param callback.success {Boolean} 回调函数参数
     */
    function updateDataByAllMkt(data,callback) {
        //doing something...
    }
```

---


## 前端Demo代码约定
### 基本要求：
- item 层级依赖尽量简洁，提高可读性
- 代码结构清晰
- view 视图代码块布局合理分拆成 item
- 合理利用Sencha Touch 现有组件
- ++==审核元素 所得id (如"ext-element-35")== 不能作为css样式引用。（id会根据视图元素数量改变而做出变化++
- ++只可通过自定cls或sencha所提供sass变量来修改sencha原生组件style。切记==不可引用sencha 已定好class名修改样式==，会污染sencha css，影响整个项目。++
- ++原则上不允许 任何以 tagName 来写样式，污染原生 tagName 样式，更改样式只能以class 做更改++

### Style

```style
.demo-test .index{

}
.demo-test .index .index-red{
    
}
.demo-test .index .index-green{
    
}
```
### html:
```html
{
            xtype: 'container',
            cls: 'demo-test',
            itemId: 'test',
            html: ['<div class="index">',
                '<div class="index-red"></div>',
                '<div class="index-green"></div>'
                '</div>'
            ].join('')
        }
```

### css 归类至 sass文件

- 若为 组件css 则移至 相应组件sass文件，非组件css 移至与页面对应的(sass)目录下sass文件

## 功能开发约定
- itemId 必须唯一，不建议使用id属性


未完.
