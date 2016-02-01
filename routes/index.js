var express = require('express');
var flash = require('../util/flash.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  if(user){
      res.render('index', { title: 'Migo个人健身系统' ,user : user});
  }
  else{
      res.render('index', { title: 'Migo个人健身系统'});
  }

});
/*首页表格 */
router.post('/chart',function(req,res,next){
    var type = req.body.type;
    var x,series;
    if(type == 'day'){
        x = ['01-01','01-02','01-03','01-04','01-05','01-06'];
        series = {
            name : "日健身数据",
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]
        };
    }
    else if(type == "week"){
        x = ['10','11','12','13','14','15'];
        series = {
            name : "周健身数据",
            data: [499, 715, 1064, 300, 200, 358]
        };
    }
    else if(type == "month"){
        x = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        series = {
            name : "周健身数据",
            data: [499, 715, 1064, 300, 200, 358]
        };
    }
    res.send(flash(200,'success',{
		x:x,
        series:series
    }));
    
})
/*训练计划*/
router.get('/plane',function(req,res,next){
    res.render('plane',{title:"Migo个人健身系统--训练计划"});
});
/*训练计划详情*/
router.get('/dplane',function(req,res,next){
    res.render('dplane',{title:"Migo个人健身系统--训练计划"});
});
/*训练计划详情*/
router.get('/train',function(req,res,next){
    res.render('train',{title:"Migo个人健身系统--训练计划"});
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
