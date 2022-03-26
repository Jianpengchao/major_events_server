// 导入处理路径的 path 核心模块
const path = require('path')
// 导入数据库操作模块
const db = require('../db/index')

const { dataBaseTable } = require('../config')

exports.addArticle = (req, res) => {
	// 手动判断是否上传了文章封面
	if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
	const articleInfo = {...req.body,
		cover_img: path.join('/uploads', req.file.filename),
		pub_date: new Date(),
		author_id: req.user.id

	}

	const sql = `insert into ${dataBaseTable.article} set ?`
	db.query(sql, articleInfo, (err, results) => {
		// 执行 SQL 语句失败
		if (err) return res.cc(err)

		// 执行 SQL 语句成功，但是影响行数不等于 1
		if (results.affectedRows !== 1) return res.cc('发布文章失败！')

		// 发布文章成功
		res.cc('发布文章成功', 0)
	})
}