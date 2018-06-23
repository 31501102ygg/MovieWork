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
var  sql = 'SELECT reviews.filmid,userid,username,title,shortreview,longreview,createdate,reviews.score,imghref FROM reviews INNER JOIN allfilms ON reviews.filmid = allfilms.filmid';
var  sql2 = 'SELECT reviews.filmid,userid,username,title,shortreview,longreview,createdate,reviews.score,imghref FROM reviews INNER JOIN allfilms ON reviews.filmid = allfilms.filmid where filmname like'
router.get('/loadfilmreviews', function(req, res, next) {
    //查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.sendStatus(500);
          return;
        }
        //返回结果
        res.jsonp(result);
    });
});

router.get('/searchfilmreviews', function(req, res, next) {
    //查
    var params = URL.parse(req.url, true).query;
    let filmname = params.filmname;
    filmname = "'%"+filmname+"%'";
    let sql = sql2+filmname;
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          res.sendStatus(500);
          return;
        }
        console.log(result);
        //返回结果
        res.jsonp(result);
    });
});
module.exports = router;