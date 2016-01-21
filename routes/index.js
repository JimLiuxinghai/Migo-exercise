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
/*训练计划*/
router.get('/plane',function(req,res,next){
    res.render('plane',{title:"Migo个人健身系统--训练计划"});
});
/*训练计划详情*/
router.get('/dplane',function(req,res,next){
    res.render('dplane',{title:"Migo个人健身系统--训练计划"});
});
/*健身动态*/
router.get('/dynamic',function(req,res,next){
    res.render('dynamic',{title:"Migo个人健身系统--健身动态"});
});
/*健身日记*/
router.get('/diary',function(req,res,next){
    res.render('diary',{title:"Migo个人健身系统--健身日记"});
});

/*发表健身日记*/
router.get('/publish',function(req,res,next){
    res.render('publish',{title:"Migo个人健身系统--发表健身日记"});
});
/*个人中心*/
router.get('/usercenter',function(req,res,next){
  res.render('usercenter',{title:"Migo个人健身系统--个人中心"});
});
router.get('/setprofile',function(req,res,next){
    res.render('setprofile',{title:"Migo个人健身系统--个人中心"});
});
module.exports = router;
