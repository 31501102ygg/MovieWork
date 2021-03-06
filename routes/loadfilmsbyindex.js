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
var  sql2 = 'SELECT * FROM films limit ?,6';
var  sql1 = 'SELECT * FROM newfilms limit ?,6';

router.get('/hot', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let index = params.index;
    console.log(index);
    let query = [(index-1)*6];
    //查
    connection.query(sql2,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
});

router.get('/new', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let index = params.index;
    console.log(index);
    let query = [(index-1)*6];
    //查
    connection.query(sql1,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
});

module.exports = router;