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
var sql = "SELECT * FROM  allfilms where filmid = ?";
var sql2 = "SELECT * FROM  actors where actorid = ?";
var sql3 = "SELECT * FROM  filmactor INNER JOIN actors ON filmactor.actorid = actors.actorid where filmid = ?";
router.get('/main', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let filmid = params.filmid;
    console.log(filmid);
    let query = [filmid];
    //查
    connection.query(sql,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
});
router.get('/director', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let director = params.director;
    console.log(director);
    let query = [director];
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
router.get('/actors', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let filmid = params.filmid;
    console.log(filmid);
    let query = [filmid];
    //查
    connection.query(sql3,query,function (err, result) {
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