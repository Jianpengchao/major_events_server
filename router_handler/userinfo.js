// 导入 bcryptjs 对密码进行加密
const bcrypt = require('bcryptjs')
// 导入数据库操作模块
const db = require('../db/index')

// 获取用户信息处理函数
exports.userInfo = (req, res) => {
  const sql = 'SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?'
  // 只要身份认证成功了，expressJWT 中间件会在 req 身上添加 user 属性
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    // sql 语句成功，但是查询接口可能为空
    if(results.length !== 1) return res.cc('获取用户信息失败！')
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0]
    })
  })
}

// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
  const updateData = req.body
  const sql = 'UPDATE ev_users SET ? WHERE id=?'
  db.query(sql, [updateData, updateData.id], (err, results) => {
    if(err) return res.cc(err)
    // 执行 SQL 语句成功，但是响应行数不等于 1，也是失败的
    if(results.affectedRows !== 1) return res.cc('更新用户信息失败！')
    // 更新数据库成功
    res.cc('更新用户信息成功！', 0)
  })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  const userId = req.user.id
  // 只要身份认证成功了，expressJWT 中间件会在 req 身上添加 user 属性
  const sql = 'SELECT * FROM ev_users WHERE id=?'
  db.query(sql, userId, (err, results) => {
    if(err) return res.cc(err)
    // 判断结果是否存在
    if(results.length !== 1) return res.cc('用户不存在！')
    // 判断旧密码是否一致
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if(!compareResult) return res.cc('原密码错误！')
    // 更新数据库密码
    const updatePwdSQL = 'UPDATE ev_users SET password=? WHERE id=?'
    // 对新密码进行加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(updatePwdSQL, [newPwd, userId], (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('更新密码失败！')
      res.cc('更新密码成功！')
    })
  })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = 'UPDATE ev_users SET user_pic=? WHERE id=?'
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更换头像失败！')
    res.cc('更换头像成功！', 1)
  })
}