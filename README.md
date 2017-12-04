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

## 初始项目

```git
mkdir react

cd react

npm init
```

## webpack

1. 安装webpack

```
npm i webpack --save-dev
```

2. 新建配置文件 webpack.dev.config.js

```js
const path = require('path')

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```

3. 编译webpack
```bash
mkdir src && cd src && touch index.js
```

在index.js里面添加
```js
document.getElementById('app').innerHTML = `hello world`
```

执行命令

```bash
webpack --config webpack.dev.config.js
```

执行完成后会生成一个dist文件，里面的bundle是打包好的文件
```bash
touch ./dist/index.html
```

在index.html里加入
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./bundle.js" charset="utf-8"></script>
</body>
</html>
```
打开index.html可以看到输出  hello world