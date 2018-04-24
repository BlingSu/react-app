const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {'pwd': 0, '_v': 0}

Router.get('/list',function(req, res){
  const { type } = req.query
	User.find({type},function(err, doc){
		return res.json({code:0, data:doc})
	})
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}, (err, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: user},{to: user}]}, (err, data) => {
      if (!err) {
        return res.json({code: 0, msgs: data, users: users})
      }
    })
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code: 1})
  }
  const body = req.body
	User.findByIdAndUpdate(userid, body, (err, d) => {
    const data = Object.assign({}, {
      user: d.user,
      type: d.type
    }, body)
    console.log(data, '....')
		return res.json({code: 0, data})
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
