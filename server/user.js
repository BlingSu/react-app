const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')

const _filter = {'pwd': 0, '_v': 0}

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})
Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    const userModel = new User({user, pwd:md5Pwd(pwd), type})
    userModel.save((e, d) => {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
    // User.create(, (e, d) => {
    //   if (e) {
    //     return res.json({code: 1, msg: '后端出错了'})
    //   }
    //   return res.json({code: 0})
    // })
  })
})

Router.get('/info', (req, res) => {
  // 检测cookie
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code:1})
  }
  User.findOne({_id: userid}, _filter, (err, data) => {
    if (err) {
      return res.json({code:1, msg: '后端出错了'})
    }
    if (data) {
      return res.json({code: 0, data: data})
    }
  })
})

function md5Pwd(pwd) {
  const str = 'angelasu_mail_is_angelasubi@gmail.com'
  return utils.md5(utils.md5(pwd+str))
}

module.exports = Router