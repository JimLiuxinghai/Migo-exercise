var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Migo个人健身系统' });
});
/*登录注册*/
router.get('/login',function(req,res,next){
  res.render('login',{title:"Migo个人健身系统--登录"});
});
router.get('/reg',function(req,res,next){
  res.render('reg',{title:"Migo个人健身系统--注册"});
});
/*个人中心*/
router.get('/usercenter',function(req,res,next){
  res.render('usercenter',{title:"Migo个人健身系统--个人中心"});
});
router.get('/setprofile',function(req,res,next){
    res.render('setprofile',{title:"Migo个人健身系统--个人中心"});
});
module.exports = router;
