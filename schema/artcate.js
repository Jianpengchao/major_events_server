// 导入验证规则的包
const joi = require('@hapi/joi')

// 定义 name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义验证新增文章分类表单数据的规则对象
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}