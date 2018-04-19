const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})
Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, {'pwd': 0}, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    User.create({user, pwd:md5Pwd(pwd), type}, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      return res.json({code: 0})
    })
  })
})

Router.get('/info', (req, res) => {
  // 检测cookie
  return res.json({code:1})
})

function md5Pwd(pwd) {
  const str = 'angelasu_mail_is_angelasubi@gmail.com'
  return utils.md5(utils.md5(pwd+str))
}

module.exports = Router