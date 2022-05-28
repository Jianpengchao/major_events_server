// 连接数据库
const mysql = require('mysql2')

const { dataBase } = require('../config')

const db = mysql.createConnection(dataBase)

module.exports = db