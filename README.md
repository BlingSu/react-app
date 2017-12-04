# React全家桶

## 说明

1. 技术栈
* react
* react-router-dom
* redux
* webpack

2. 目录

```
| .babelrc                  #配置文件
| .package-lock.json
| .package.json
| README.md
| webpack.config.js         #生产环境
| webpack.dev.config.js     #开发环境
| 
|-dist
|-public                   #公共资源目录
|-src                      #源码
      | index.html
      | index.js            #入口文件
      | 
      |-component          #组件
      |  └─Hello
      |       Hello.js
      |
      |-pages               #目录
      |  |-Counter
      |       Counter.js
      |
      |-redux
      |   | reducers.js
      |   | store.js
      | 
      |   |-actions
      |   |   counter.js
      |   |   user.js
      |   |
      |   |-middleware
      |       middleware.js
      |
      |   |-reducers
      |       counters.js
      |       user.js
      |
      |-router              #路由
          Bundle.js
          router.js
```