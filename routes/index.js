var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Migo个人健身系统' });
});
/*登录注册*/
router.get('/login',function(req,res,next){
  res.render('login',{title:"Migo个人健身系统"});
})
router.get('/reg',function(req,res,next){
  res.render('reg',{title:"Migo个人健身系统"});
})
module.exports = router;
