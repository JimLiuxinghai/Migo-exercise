var express = require('express');
var flash = require('../util/flash.js');
var User = require('../db/user');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var Plane = require('../db/plane');
var moment = require('moment');
var hash = require('../util/pass').hash;
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.session.user;
    var myplane = [];
    var yesCalorie = [];
    var yesterday = moment(moment().now - 86400000).format('YYYY-MM-DD');
    //var yesterday = moment(moment().now).format('YYYY-MM-DD');
    //获取提交训练人数
    User.find(function(err,content){
        var indexUser = {
            userNum : null,
            userTrianNum : 0,
            train : null
        };
        indexUser.userNum = content.length;
        for(var i = 0; i < content.length; i ++){
            if(content[i].mytrain[0] != undefined){
                indexUser.userTrianNum += 1;
            }
            for(var j = 0; j < content[i].calorie.length; j ++){
                if(content[i].calorie[j].time == yesterday){
                    yesCalorie.push({
                        name : content[i].name,
                        calorie : content[i].calorie[j].calorie
                    })
                }
            }

        }
        console.log(yesCalorie);
        /*健身热量排序*/
        yesCalorie = maopao(yesCalorie);
        console.log(yesCalorie);

        /*首页日记发表*/
        Diary.find({state : '1'}).sort({ 'time' : -1 }).limit(5) .exec(function(err,content){
            var diary = [];
            if(err){
                return;
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
                        dynamic.push(result);
                    })
                    Plane.find().sort({'trainUser.length' : -1}).limit(4).exec(function(err,content){
                        var hotplane = content;

                        if(user){
                            var navuser = {
                                user : user,
                                userlogo : 'images/user/'+user+'.png'
                            }
                            Plane.find(function(err,content){
                                if(err){
                                    console.log(err);
                                }
                                for(var i = 0; i < content.length; i ++){
                                    for(var j = 0; j < content[i].trainUser.length; j ++){
                                        if(content[i].trainUser[j].name == user){
                                            myplane.push(content[i]);
                                        }
                                        else{
                                            continue;
                                        }
                                    }
                                }
                                res.render('index', { title: 'Migo个人健身系统' ,user : navuser,indexUser:indexUser,diarySort:diarySort,dynamic:dynamic,myplane : myplane, hotplane : hotplane, yesCalorie : yesCalorie });
                            })
                        }
                        else{
                            res.render('index', { title: 'Migo个人健身系统',indexUser:indexUser,diarySort:diarySort,dynamic:dynamic, hotplane : hotplane, yesCalorie : yesCalorie});
                        }
                    })
                }

            })

        })

    });
});
/*首页表格 */
router.post('/chart',function(req,res,next){
    var user = req.session.user;
    console.log(user);
    var type = req.body.type;
    if(!user){
        res.send('no user');
    }
    else{
        if(type == 'day'){
            var x,series;
            var calorie = [];
            var dayNow = moment().format("YYYY-MM-DD");
            var dayArr = [];
            dayArr.push(dayNow);
            for(var i = 1; i < 7; i ++){
                var time = moment.now() - 86400000*i;
                var day = moment(time).format("YYYY-MM-DD");
                dayArr.push(day);
            }
            x = dayArr.reverse();
            User.findOne({name : user},function(err,content){
                x.map(function(day){
                    var dayC = 0;
                    for(var i = 0; i < content.calorie.length; i ++){
                        if(content.calorie[i].time == day){
                            console.log(content.calorie[i].calorie)
                            dayC = parseInt(content.calorie[i].calorie);
                        }
                        else{
                            continue;
                        }
                    }
                    calorie.push(dayC)
                })
                series = {
                    name : "日健身数据",
                    data: calorie
                };
                res.send(flash(200,'success',{
                    x:x,
                    series:series
                }));
            })

        }
        else if(type == "week"){
            var x,series;

            x = ['10','11','12','13','14','15'];
            series = {
                name : "周健身数据",
                data: [499, 715, 1064, 300, 200, 358]
            };
            res.send(flash(200,'success',{
                x:x,
                series:series
            }));
        }
        else if(type == "month"){
            var x,series;
            x = ['1月','2月','3月'];
            series = {
                name : "月健身数据",
                data: [499, 715, 1064]
            };
            res.send(flash(200,'success',{
                x:x,
                series:series
            }));
        }
    }
})
//冒泡
function maopao(arra){

    var temp;

    for(var i=0;i<arra.length;i++){ //比较多少趟，从第一趟开始

        for(var j=0;j<arra.length-i-1;j++){ //每一趟比较多少次数

            if(arra[j].calorie < arra[j+1].calorie){
                temp=arra[j];
                arra[j]=arra[j+1];
                arra[j+1]=temp;
            }
        }
    };
    return arra;
}

module.exports = router;