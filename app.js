const express = require('express')
// 导入 ocrs 跨域解决中间件
const cors = require('cors')

const joi = require('@hapi/joi')

const userRouter = require('./router/user')

const app = express()

app.use(cors())

// 配置解析表单数据的中间件,只能解析 application/x-www-form-urlencoded 格式表单数据
app.use(express.urlencoded({extended: false}))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  res.cc = function(err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use('/api', userRouter)

// 在路由之后，定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)
  // 未知的错误
  res.cc(err)
})


app.listen(3007, ()=> {
  console.log('major events project server running at http://127.0.0.1:3007')
})