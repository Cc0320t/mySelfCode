// 引入 express body-parser mysql cors
// body-parser 2019已弃用
const express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");  // 用来跨域的
app.use(cors());
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '03200000',
  database: 'test',
  multipleStatements: true
});
conn.connect();
var sql = "select id, name, age from testcode";    // 调取数据库数据 sql语句
app.get('/api/getUserList', (req, res) => {
  conn.query(sql,function(err,result){
    if (err) return res.json({code: 10001, message: err});
    return res.json({code: 200, result});
  });
});
app.post('/api/login', (req, res) => {
  var myObj = JSON.parse(JSON.stringify(req.body));
  var addSql =
   `INSERT INTO username(username, password) VALUES(${myObj.username}, ${myObj.password})`;
  conn.query(addSql, function(err, req, res) {
    if (err) throw err;
    console.log('The solution is: ', req);
  });
  res.json(req.body);
  console.log(req.body);
});
/* 监听端口 */
app.listen(3307, () => {
  console.log('——————————服务已启动——————————');
});
// 不能频繁调用
// conn.end();
