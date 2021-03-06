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
var sql1 = "update account set nickname = ?,sex = ?,age = ?,local = ?,job = ?,motto =?  where userid = ?";
var sql2 = "select * from account where userid = ?";

router.post('/modifyaccount',function(req,res,next){
    //解析请求参数
      let userid = req.body.userid;
      let nickname = req.body.nickname;
      let sex = req.body.sex;
      let age = req.body.age;
      let local = req.body.local;
      let job = req.body.job;
      let motto = req.body.motto;
      let query = [nickname,sex,age,local,job,motto,userid];
      //查
      connection.query(sql1,query,function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }else{
            //   console.log(result);
          }
          
          console.log("successful");
          //把搜索值输出
         res.jsonp(result);
      });
  })
router.get('/loadaccount',function(req,res,next){
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    let userid = params.userid;
    let query = [userid];
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
})

module.exports = router;