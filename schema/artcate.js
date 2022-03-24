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

const id = joi.number().required()
// 定义验证(删除/获取)文章分类表单数据的规则对象
exports.id_cate_schema = {
  params: {
    id
  }
}
// 定义验证根据id更新文章分类表单数据的规则对象
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias
  }
}