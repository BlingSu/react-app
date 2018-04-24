const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => { 
  console.log('mongo connect success')
})


const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {'type': String, require: true},
    'avatar': {'type': String},//头像
    'desc': {'type': String}, //简介
    'title': {'type': String}, //职位
    // boss
    'company': {'type': String},
    'money': {'type': String}
  },
  chat: {
    'chatid': {'type': String, require: true},
    'from': {'type': String, 'require': true},
    'to': {'type': String, 'require': true}, 
    'read': {'type': Boolean, default: false},
    'content': {'type': String, 'require': true, 'default': ''},
    'created_time': {'type': Number, 'default': new Date().getTime()}
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name) 
  }
}