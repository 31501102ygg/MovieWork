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
//SQL语句/
var sql1 = "insert into contact (name,mail,message) values(?,?,?)";

router.post('/add', function(req, res, next) {
    //解析请求参数
    let name = req.body.name;
    let mail = req.body.mail;
    let message = req.body.message;
    let query = [name,mail,message];
    //查
    connection.query(sql1,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log("successful");
        //把搜索值输出
       res.jsonp(result);
    });
});

module.exports = router;