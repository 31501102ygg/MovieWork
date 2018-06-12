var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '123456',
port     : "3306",
database : 'web'
});
//执行创建连接 
connection.connect();
//SQL语句
var  sql = 'INSERT INTO users (username,password) values(?,?)';

router.post('/', function(req, res, next) {
    //解析请求参数
      var addSqlParams = [req.body.username,req.body.password];
      console.log(addSqlParams);
    //查
    connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.sendStatus(500);
          return;
        }

        //返回插入是否成功
       res.sendStatus(200);
    });
});

module.exports = router;