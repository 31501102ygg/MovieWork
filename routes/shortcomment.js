var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql = require('mysql');
//创建连接
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: "3306",
  database: 'web'
});
//执行创建连接 
connection.connect();
//SQL语句
var sql1 = "insert into shortcomment (userid,filmid,score,evaluate,givelike,createdate) values(?,?,?,?,0,?)";
var sql2 = "select * from shortcomment where userid = ? and filmid = ?";
var sql3 = "SELECT * from shortcomment INNER JOIN users on shortcomment.userid = users.userid where filmid = ?";
var sql4 = "insert into otherscomments (commentid,otheruserid,content,createtime) values(?,?,?,?)";
var sql5 = "select username,content,createtime from otherscomments INNER JOIN users on users.userid = otherscomments.otheruserid where commentid = ?";
var sql6 = "update shortcomment set givelike = givelike+1 where commentid = ?";
var sql7 = "insert into usergivelike (commentid,userid) values(?,?)";
var sql8 = "SELECT * FROM usergivelike WHERE userid = ? AND usergivelike.commentid IN(select shortcomment.commentid from shortcomment where filmid = ?)";
var sql9 = "DELETE FROM shortcomment WHERE commentid = ?";
var sql10 = "DELETE FROM usergivelike WHERE commentid = ?";
var sql11 = "DELETE FROM otherscomments WHERE commentid = ?";
//时间格式化
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(),    //day
    "h+": this.getHours(),   //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

router.post('/add', function (req, res, next) {
  //解析请求参数
  let userid = req.body.userid;
  let filmid = req.body.filmid;
  let score = req.body.score;
  let evaluate = req.body.evaluate;
  let d1 = new Date().format('yyyy-MM-dd hh:mm:ss');
  let query = [userid, filmid, score, evaluate, d1];
  //查
  connection.query(sql1, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log("successful");
    //把搜索值输出
    res.jsonp(result);
  });
});

router.get('/search', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let userid = params.userid;
  let filmid = params.filmid;
  let query = [userid, filmid];
  //查
  connection.query(sql2, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log(result);
    //把搜索值输出
    res.jsonp(result);
  });
})

router.get('/searchbyfilm', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let filmid = params.filmid;
  let query = [filmid];
  //查
  connection.query(sql3, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log(result);
    //把搜索值输出
    res.jsonp(result);
  });
})

router.post('/addcomment', function (req, res, next) {
  //解析请求参数
  let userid = req.body.userid;
  let commentid = req.body.commentid;
  let content = req.body.content;
  let otheruserid = req.body.otheruserid;
  let d1 = new Date().format('yyyy-MM-dd hh:mm:ss');
  let query = [commentid, otheruserid, content, d1];
  //查
  connection.query(sql4, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log("successful");
    //把搜索值输出
    res.jsonp(result);
  });
})

router.get('/loadotherscomment', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let commentid = params.commentid;
  let query = [commentid];
  //查
  connection.query(sql5, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log(result);
    //把搜索值输出
    res.jsonp(result);
  });
})

router.get('/updatelike', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let commentid = params.commentid;
  let userid = params.userid;
  let query = [commentid];
  //查
  connection.query(sql6, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
  });

  query = [commentid, userid];
  connection.query(sql7, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    console.log(result);
    //把搜索值输出
    res.jsonp(result);
  });
})

router.get('/loaduserlike', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let userid = params.userid;
  let filmid = params.filmid;
  let query = [userid, filmid];
  //查
  connection.query(sql8, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log(result);
    //把搜索值输出
    res.jsonp(result);
  });
})

router.get('/removecomment', function (req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
  let commentid = params.commentid;
  let query = [commentid];
  console.log(query);
  //查
  connection.query(sql10, query, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    connection.query(sql11, query, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      connection.query(sql9, query, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
        }
        //把搜索值输出
        res.jsonp(result);
      });
    });
  });

})

module.exports = router;