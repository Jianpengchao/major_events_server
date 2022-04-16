// 导入数据库操作模块
const db = require('../db/index')

const { dataBaseTable } = require('../config')
// 获取文章分类处理函数
exports.cates = (req, res) => {
  const sql = `SELECT * FROM ${dataBaseTable.artcate} WHERE is_delete=0 ORDER BY ID ASC`
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results
    })
  })
}
// 新增文章分类的处理函数
exports.addcates = (req, res) => {
  const {name, alias } = req.body
  // 定义查询 分类名称 和 分类别名 是否被占用的 SQL 语句
  const sql = `SELECT * FROM ${dataBaseTable.artcate} WHERE name=? OR alias=?`
  db.query(sql, [name, alias], (err, results) => {
    if(err) return res.cc(err)
    // 判断数据的 length
    if(results.length === 2) return res.cc('分类名称与分类别名已被占用！')

    // 判断数据的 length === 1 的三种情况
    if(results.length === 1 && results[0].name === name && results[0].alias === alias) {
      return res.cc('分类名称与分类别名已被占用！')
    }
    if(results.length === 1 && results[0].name === name) {
      return res.cc('分类名称名已被占用！')
    }
    if(results.length === 1 && results[0].alias === alias) {
      return res.cc('分类别名名已被占用！')
    }
    const insertSql = `INSERT INTO ${dataBaseTable.artcate} SET ?`
    db.query(insertSql, req.body, (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 0)
    })
  })
}
// 根据id删除文章分类的处理函数
exports.deletecate = (req, res) => {
  const sql = `UPDATE ${dataBaseTable.artcate} SET is_delete=1 WHERE id=?`
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  })
}
// 根据id获取文章分类的处理函数
exports.getcate = (req, res) => {
  const sql = `SELECT * FROM ${dataBaseTable.artcate} WHERE id=? AND is_delete=0`
  db.query(sql, req.params.id, (err, result) => {
    if(err) return res.cc(err)

    if(result.length !== 1) return res.cc('获取文章分类数据失败！')

    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: result[0]
    })
  })
}
// 根据id更新文章分类的处理函数
exports.updatecate = (req, res) => {
  const {id, name, alias} = req.body
  // 查询别名是否别占用
  const sql = `SELECT * FROM ${dataBaseTable.artcate} WHERE id<>? AND (name=? OR alias=?)`
  
  db.query(sql, [id, name, alias], (err, results) => {
    if(err) return res.cc(err)
    
    // 分类名称和分类别名都被占用
    if(results.length === 2) return res.cc('分类名称与分类别名已被占用，请更换后重试！')
    if(results.length === 1 && results[0].name === name && results[0].alias === alias) {
      return res.cc('分类名称与分类别名已被占用，请更换后重试！')
    }

    // 分类名称或分类别名被占用
    if(results.length === 1 && results[0].name === name) {
      return res.cc('分类名称已被占用，请更换后重试！')
    }
    if(results.length === 1 && results[0].alias === alias) {
      return res.cc('分类分类已被占用，请更换后重试！')
    }
    
    // 更新数据库
    const updateSql = `UPDATE ${dataBaseTable.artcate} SET ? WHERE id=?`
    db.query(updateSql, [req.body, id], (err, result) => {
      if(err) return res.cc(err)
      
      if(result.affectedRows !== 1) return res.cc('更新文章分类失败！')

      res.cc('更新文章分类成功！', 0)
    })
  })
}