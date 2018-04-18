const express = require('express')
const userRouter = require('./user')
const app = express()

app.use('/user', userRouter)

app.listen(9999, () => {
  console.log('node start at port 9999')
})