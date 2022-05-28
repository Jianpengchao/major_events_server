const express = require('express')
// 导入 ocrs 跨域解决中间件
const cors = require('cors')
// 导入验证规则的包
const joi = require('@hapi/joi')
// 将 token 解析成用户信息
const expressJWT = require('express-jwt')
// 导入全局配置文件
const config = require('../config')
// 导入用户路由模块
const userRouter = require('../router/user')
// 导入用户信息路由模块
const userinfoRouter = require('../router/userinfo')
// 导入文章分类的路由模块
const artcateRouter = require('../router/artcate')
// 导入文章的路由模块
const articleRouter = require('../router/article')

const app = express()

// 解决跨域
app.use(cors())

// 配置解析表单数据的中间件,只能解析 application/x-www-form-urlencoded 格式表单数据
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

// 一定在路由之前配置解析 token 的中间件
app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path: [/^\/api/]}))

app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', artcateRouter)
app.use('/my/article', articleRouter)

// 在路由之后，定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)
  // token无效的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})


module.exports = app