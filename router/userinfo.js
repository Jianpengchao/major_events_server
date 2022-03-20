const express = require('express')
const router = express.Router()

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')

const { userInfo, updateUserInfo } = require('../router_handler/userinfo')
// 获取用户信息的接口
router.get('/userinfo', userInfo)
// 更新用户信息的接口, 并且使用验证规则
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

module.exports = router