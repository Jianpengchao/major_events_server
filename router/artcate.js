// 这是文章分类的路由模块
const express = require('express')
const router = express.Router()

const { cates } = require('../router_handler/carcate')

router.get('/cates', cates)

module.exports = router