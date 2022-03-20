// 导入验证规则的包
const joi = require('@hapi/joi')

/**
 *  number() 必须是数字
 *  integer() 正式
 *  string() 必须是字符串
 *  alphanum() 只能是包含 a-zA-Z0-9的字符串
 *  min(length) 最小长度
 *  max(length) 最大长度
 *  pattern(正则表达式) 必须符合正则表达式的规则
 *  required() 必须填，不能为 undefined,
 *  email() 邮箱
 */

// 必须为6-18位字母、数字
const regPsd = /^(?![^a-zA-Z]+$)(?!\D+$)/

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(2).max(10).required()
const password = joi.string().pattern(regPsd).required()
// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

// 定义 id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()
// 定义验证更新用户信息表单数据的规则对象
exports.update_userinfo_schema = {
  // 需要对 req.body 里面的数据进行验证
  body: {
    id,
    nickname,
    email: user_email
  }
}