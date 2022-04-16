// 这是文章分类的路由模块
const express = require('express')
const router = express.Router()

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

const {
  add_cate_schema,
  id_cate_schema,
  update_cate_schema
} = require('../schema/artcate')

const {
  cates,
  addcates,
  deletecate,
  getcate,
  updatecate
} = require('../router_handler/carcate')

// 获取文章分类
router.get('/cates', cates)
// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), addcates)
// 根据id删除文章分类
router.delete('/deletecate/:id', expressJoi(id_cate_schema), deletecate)
// 根据id获取文章分类
router.get('/getcate/:id', expressJoi(id_cate_schema), getcate)
// 根据id更新文章分类
router.post('/updatecate',expressJoi(update_cate_schema), updatecate)

module.exports = router