// 导入数据库操作模块
const db = require('../db/index')

const { dataBaseTable } = require('../config')
// 获取文章分类处理函数
exports.cates = (req, res) => {
  const sql = `SELECT * FROM ${dataBaseTable.artcate} WHERE is_delete=0 ORDER BY ID ASC`
  // res.send(dataBaseTable)
  // res.send('config')
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results
    })
  })
}