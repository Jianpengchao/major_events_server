// 这是全局的配置文件
module.exports = {
  port: 8080,  // 端口
  jwtSecretKey: 'vernin No1. ^_^', // 生成token的字符串
  expiresIn: '10h',  // token生效时间
  // 连接数据配置
  dataBase: {
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
  },
  dataBaseTable: {
    // 用户信息表
    user: 'ev_users',
    // 文章分类数据表
    artcate: 'ev_article_cate',
    // 文章数据表
    article: 'ev_articles' 
  }
}