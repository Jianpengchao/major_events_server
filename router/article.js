const express = require('express')
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

const { add_article_schema } = require('../schema/article')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })


const router = express.Router()

const { id_cate_schema } = require('../schema/artcate')

const {
	addArticle,
	deleteArticle
} = require('../router_handler/article')

// 发布新文章
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), addArticle)
根据文章id删除文章
router.delete('/delete/:id', expressJoi(id_cate_schema), deleteArticle)

module.exports = router