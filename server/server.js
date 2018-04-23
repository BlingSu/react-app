const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')

const User = model.getModel('user')
const Chat = model.getModel('chat')

const app = express()
// with express
const server = require('http').Server(app)
const io = require('socket.io')(server)


io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    // console.log(data)
    // io.emit('recivemsg', data)
    const {from, to, msg} = data
    const chaid = [from, to].sort().join('_')
    Chat.create({chaid, from, to, content: msg}, (err, doc) => {
      io.emit('recivemsg', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)

server.listen(9999, () => {
  console.log('node start at port 9999')
})