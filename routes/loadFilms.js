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
var  sql1 = 'SELECT * FROM films ';
var  sql2 = "SELECT * FROM allfilms where types like ";
var  sql3 = "SELECT * FROM allfilms where filmname like ";

router.get('/', function(req, res, next) {
    //解析请求参数

    //查
    connection.query(sql1,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值返回
       res.jsonp(result);
    });
});

router.get('/bytag', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let tag = params.tag;
    tag = "'%"+tag+"%'";
    let sql = sql2+tag;
    console.log(sql);
    //查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        //把搜索值返回
       res.jsonp(result);
    });
});

router.get('/search', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let input = params.input;
    input = "'%"+input+"%'";
    let sql = sql3+input;
    console.log(sql);
    //查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result);
        //把搜索值返回
       res.jsonp(result);
    });
});

module.exports = router;