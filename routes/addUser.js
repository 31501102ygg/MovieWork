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
var sql1 = 'SELECT userid FROM users where username = ?';
var sql2 = 'INSERT INTO account (userid) values(?)';

router.post('/', function(req, res, next) {
    //解析请求参数
      var addSqlParams = [req.body.username,req.body.password];
      var userid = 0;
      console.log(addSqlParams);
    //查
    connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.sendStatus(500);
          return;
        }
        addSqlParams = [req.body.username];
        connection.query(sql1,addSqlParams,function(err,result){
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.sendStatus(500);
              return;
          }
          console.log(result[0]);
          console.log(result[0].userid)
          userid = result[0].userid;
          console.log(userid)
          addSqlParams = [userid];
          connection.query(sql2,addSqlParams,function (err, result) {
            if(err){
              console.log('[INSERT ERROR] - ',err.message);
              res.sendStatus(500);
              return;
            }
      
            //返回插入是否成功
           res.sendStatus(200);
        });
        })
    });
   
});

module.exports = router;