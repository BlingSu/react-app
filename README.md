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

## Babel

[把es6以上的代码编译成es5，可以参考这个](https://babeljs.io/)

es2015 解析es6, state-0 解析es7 core用于api转码
```bash
npm i babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save-dev
```

新建babel配置文件
```bash
touch .babelrc
```

.babelrc

```
{
    "presets": [
        "es2015",
        "react",
        "stage-0"
    ],
    "plugins": []
}
```

修改webpack.dev.config.js,添加babel-loader

```js
module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      }
    ]
}
```

将 src/index.js 的代码换成es6

```js
const pageContent = str => { document.getElementById('app').innerHTML = str }

pageContent(`hello webpack...`)
```
执行 webpack --config webpack.dev.config.js


## react

```bash
npm i react react-dom --save
```

修改src/index.js 的内容

```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <h1>Hello, world</h1>,
    document.getElementById('app')
)
```

执行 webpack --config webpack.dev.config.js 可以看效果

### 组件化

```bash
cd src && mkdir component
cd component && mkdir Hello
cd Hello && touch Hello.js
```

Hello 组件

```js
import React, {Component} from 'react'
export default class Hello extends Component {
    render() {
        return (
            <div>
                Hello,React!
            </div>
        )
    }
}
```

修改src/index.js，引入组件

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './component/Hello/Hello'

ReactDOM.render(
    <Hello/>, document.getElementById('app'))

```

简化打包命令

```bash
    dev-build: "webpack --config webpack.dev.config.js"
```

执行 npm run dev-build 就能看到效果了

## react-router

```bash
npm i react-router-dom --save
```

新建两个组件

```bash
cd src
mkdir Home && mkdir About
touch Home/Home.js && touch About/About.js
```

Home.js

```js
import React, {Component} from 'react'

export default class About extends Component {
  render () {
    return (
      <div>
        About page
      </div>
    )
  }
}
```

About.js

```js
import React, {Component} from 'react'

export default class Home extends Component {
  render () {
    return (
      <div>
        home page
      </div>
    )
  }
}
```

[根据文档，路由配置](http://reacttraining.cn/web/guides/quick-start)

```js
import React from 'react'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </div>
  </Router>
)

export default getRouter
```

修改src/index.js的内容

```js
import React from 'react'
import ReactDom from 'react-dom'

import getRouter from './router/router'

ReactDom.render(
    getRouter(), document.getElementById('app'))
```

还得在配置一个服务器，打包完点击才有跳转的效果～

## webpack-dev-server

```bash
npm i webpack-dev-server --save-dev
```

修改webpack.dev.config.js 添加webpack-dev-server配置

```js
devServer: {
    contentBase: path.join(__dirname, './dist')
    // contentbase 指向url的根目录
}
```

然后需要使用 webpack-dev-server --config webpack.dev.config.js来启动
所以需要在package.json在配置一个启动命令

```js
    "start": "webpack-dev-server --config webpack.dev.config.js"
```

执行 npm run start 就可以看到效果啦

> webpack-dev-server 配置
* color: 彩色日志
* historyApiFallback: 404重定index.html
* proxy: 代理
* hot 热加载
* host
```js
proxy: {
  '/api': 'http://localhost:9527'
}
```

修改webpck.dev.config的配置:

```js
devServer: {
  port: 8080,
  contentBase: path.join(__dirname, './dist'),
  historyApiFallback: true
}
```

如果要在控制台打出彩色的话可以这么配置
```bash
"dev": "webpack-dev-server --config webpack.dev.config.js --color --progress"
```

执行 npm run start 可以看到打包的输出以及解决/about刷新404的问题。