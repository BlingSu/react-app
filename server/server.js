const express = require('express')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/test'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => { 
  console.log('mongo connect success')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}))

User.create({
  user: 'test',
  age: 19
}, (err, doc) => {
  if (!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>hello word</h1>')
})
app.get('/data', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})

app.listen(9999, () => {
  console.log('node start at port 9999')
})