var express = require('express');
var flash = require('../util/flash.js');
var User = require('../db/user');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var hash = require('../util/pass').hash;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var user = req.session.user;
  //获取总人数
  User.find(function(err,content){
      var indexUser = {
          userNum : null,
          userTrianNum : 0,
          train : null
      };
      indexUser.userNum = content.length;
      //获取提交训练人数
      User.find(function(err,content){
          for(var i = 0; i < content.length; i ++){
              if(content[i].mytrain[0] != undefined){
                  indexUser.userTrianNum += 1;
              }
          }
          /*首页日记发表*/
            Diary.find({state : '1'}).sort({ 'time' : -1 }).limit(5) .exec(function(err,content){
                var diary = [];
                if(err){
                    return;
                    console.log()
                }
                diarySort = content;
                /*会员动态*/
                Dynamic.find().sort({ 'time' : -1 }).limit(5).exec(function(err,content){
                    var dynamic = [];
                    if(err){
                        return;
                    }
                    else{
                        content.map(function(result){
                            result.newtime = moment(result.time).format("YYYY-MM-DD HH时mm分");
                            console.log(result.newtime)
                            dynamic.push(result);
                        })
                        console.log(dynamic)
                    }
                    if(user){
                        User.findOne({name : user},function(err,content){
                            var userlogo = content.userlogo;
                            var navuser = {
                                user : user,
                                userlogo : 'images/user/'+userlogo
                            }

                            res.render('index', { title: 'Migo个人健身系统' ,user : navuser,indexUser:indexUser,diarySort:diarySort,dynamic:dynamic});
                        });

                    }
                    else{
                        res.render('index', { title: 'Migo个人健身系统',indexUser:indexUser,diarySort:diarySort,dynamic:dynamic});
                    }
                })

            })

      });

  })


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
            name : "月健身数据",
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


module.exports = router;
