// 导入 bcryptjs 对密码进行加密
const bcrypt = require('bcryptjs')
// 导入数据库操作模块
const db = require('../db/index')

// 注册新用户处理函数
exports.reguser = (req, res) => {
  // 获取个客户端提交到服务器的用户信息
  const userInfo = req.body
  // 对表单数据进行合法校验
  // if(!userInfo.username || !userInfo.password) {
  //   return res.cc('用户名或密码不合法！')
  // }
  
  // 定义 SQL 语句，查询用户名是否被占用
  const queryUser = 'SELECT * FROM ev_users WHERE username=?'
  db.query(queryUser, userInfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if(err) {
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if(results.length > 0) {
      return res.cc('用户名已存在，请更换其他用户名！')
    }

    // 用户名可以使用 ，调用 bcrypt.hashSync() 对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)

    const addUserSQL = 'INSERT INTO ev_users SET ?'
    insertUserObj = {
      username: userInfo.username,
      password: userInfo.password
    }
    db.query(addUserSQL, insertUserObj, (err, results) => {
      if(err) {
        return cc(err)
      }
      if(results.affectedRows !== 1) {
        return res.cc('注册新用户失败，请稍后重试！')
      }
      res.cc('注册成功！', 0)
    })
  })
  
}

// 登录处理函数
exports.login = (req, res) => {
  res.send('login OK!')
}