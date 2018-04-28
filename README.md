##  React-app(招聘app)

> 技术栈： React + Redux + Axios + React-router + antd-mobile + Express + mongoose + socket.io

### 使用说明

``` bash
# 克隆项目
git clone git@github.com:angelasubi/react-app.git

# 安装依赖
npm install

# 启动mogodb
sudo mongod

# 服务端
cd server
nodemon server.js

# dev运行
npm run start

# 打包运行
npm run build

```

### 项目说明

项目是基于create-react-app构建，通过eject配置项目  

功能主要分为求职者和Boss两种类型的用户  

样式方面主要用的是antd-mobile为主，使用babel-plugin-import配置懒加载  

数据方面用到axios，在拆分多个redux最后合并，在组件内使用connect获取  

服务端方面使用express搭建，mongoose连接数据库，主要的还是增删改查的功能  

对于权限控制模块则用cookie-parser模块来控制，web端也是通过获取cookie来判断当前状态  

时时聊天功能主要是用socket.io来完成，server是用socket.io模块跟express配置，web端使用socket.io-client来发送和接收，根据mongoose的_id来处理当前是谁，以及跟谁聊天的模块  


### 功能

- [x] **求职者**
    - [x] 求职者注册
    - [x] 求职者登录
    - [x] 求职者信息完善
    - [x] 求职者个人中心
    - [x] Boss列表
    - [x] 消息列表
    - [x] 聊天详情页

- [x] **Boss**
    - [x] Boss注册
    - [x] Boss登录
    - [x] Boss信息完善
    - [x] Boss个人中心
    - [x] 求职者列表
    - [x] 消息列表
    - [x] 聊天详情页

- [x] **其他**
    - [x] 聊天表情

### License
MIT
