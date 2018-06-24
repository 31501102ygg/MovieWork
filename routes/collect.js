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
var sql1 = "insert into collects (userid,filmid) values(?,?)";
var sql2 = "DELETE from collects where userid = ? and filmid = ?";
var sql3 = "select * from collects where userid = ? and filmid = ?";
var sql4 = "SELECT COUNT(filmid) FROM collects where userid = ?";
var sql5 = "select collects.filmid,filmname,imghref FROM collects INNER JOIN allfilms on collects.filmid = allfilms.filmid where userid = ?";
var sql6 = "select collects.filmid,filmname,imghref,score FROM collects INNER JOIN allfilms on collects.filmid = allfilms.filmid where userid = ? limit ?,9";
router.get('/add', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let filmid = params.filmid;
    let query = [userid,filmid];
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

router.get('/remove', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let filmid = params.filmid;
    let query = [userid,filmid];
    //查
    connection.query(sql2,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log("successful");
        //把搜索值输出
        res.jsonp(result);
    });
});
router.get('/search',function(req,res,next){
        //解析请求参数
        var params = URL.parse(req.url, true).query;
        let userid = params.userid;
        let filmid = params.filmid;
        let query = [userid,filmid];
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
})

router.get('/searchnumber',function(req,res,next){
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let query = [userid];
    //查
    connection.query(sql4,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
})

router.get('/loadcollectbyindex',function(req,res,next){
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let index = params.index;
    index = (index-1)*9;
    let query = [userid,index];
    //查
    connection.query(sql6,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
})
router.get('/loadcollects',function(req,res,next){
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let query = [userid];
    //查
    connection.query(sql5,query,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        
        console.log(result);
        //把搜索值输出
       res.jsonp(result);
    });
})
module.exports = router;