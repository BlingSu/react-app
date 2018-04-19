const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const app = express()

app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)

app.listen(9999, () => {
  console.log('node start at port 9999')
})