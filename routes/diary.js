/**
 * Created by jimliu on 2016/2/9.
 */
var express = require('express');
var Diary = require('../db/diary');
var moment = require('moment');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();

/*健身日记*/
router.get('/diary',function(req,res,next){
    //获取用户
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    Diary.find({state : '1'}).sort({ 'time' : -1 }).exec(function(err,content){
        if(err){
            res.send(flash(500,'fail',{
                msg : "获取失败"
            }));
        }
        else{
            var diary = content;
            for(var i = 0; i < diary.length;i ++){
                diary[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                diary[i].text = diary[i].diaryText.substr(0,120);
            }
            if(user){
                res.render('diary',{title:"Migo个人健身系统--健身日记",user : navuser,diaryData : diary});
            }
            else{
                res.render('diary',{title:"Migo个人健身系统--健身日记",diaryData : diary});
            }
        }

    })


});
/*日记正文页面*/
router.get('/diarytext',function(req,res,next){
    res.render('diarytext',{title : "Migo个人健身系统--健身日记"});
})
router.post('/diaryid',function(req,res,next){
    var id = req.body.id;
    Diary.find({_id : id},function(err,content){
        if(err){
            res.send(flash(500,'fail',{
                msg : "没有数据"
            }));
        }
        else{
            for(var i = 0;i < content.length;i++){
                content[i].ntime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
            }
            var diarytext = content;
            console.log(diarytext[0].ntime)
            console.log(diarytext[0])
            res.send(flash(200,'success',{
                msg : diarytext
            }));
        }


    })

})
/*发表页面*/
router.get('/publish',function(req,res,next){
    //获取用户
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    if(user){
        res.render('publish',{title:"Migo个人健身系统--发表健身日记",user : navuser});
    }
    else{
        res.render('publish',{title:"Migo个人健身系统--发表健身日记"});
    }

});
/*点赞*/
router.post('/diaryAssist',function(req,res,next){
    var id = req.body.id;
    var num = req.body.num;
    Diary.update({'_id' : id},{ 'trendAssist' : num},function(err,content){
        if(err){
            res.send(flash(500,'error',{
                msg : "点赞失败"
            }));
        }
        else{
            res.send(flash(200,'success',{
                msg : "点赞成功"
            }));
        }
    })
});
/*发表日记*/
router.post('/dpub',function(req,res,next){
    var user = req.session.user;
    var title = req.body.title;
    var text = req.body.text;
    var time = moment();
    var img = req.body.img;
    var newdiary = new Diary(Diary);
    if(img){
        img = img.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(img, 'base64');
        var filepath = 'public/images/dTitle/'+title+'.png';
        fs.writeFile(filepath, dataBuffer, function(err){
            if(err){
                console.log(err);
                res.send(flash(500,'fail',{
                    msg : "发表失败"
                }));
            }
            else{
                newdiary.username = user;
                newdiary.diaryText = text;
                newdiary.diaryTitle = title;
                newdiary.img = title;
                newdiary.time = time;
                newdiary.state = '0';
                newdiary.save(function(err){
                    if(err){
                        res.send(flash(500,'fail',{
                            msg : "发表失败"
                        }));
                    }
                    else{
                        res.send(flash(200,'success',{
                            msg : "发表成功"
                        }));
                    }
                })

            }
        })
    }
    else{
        newdiary.username = user;
        newdiary.diaryText = text;
        newdiary.diaryTitle = title;
        newdiary.time = time;
        newdiary.img = 'diary-title';
        newdiary.state = '0';
        newdiary.save(function(err){
            if(err){
                res.send(flash(500,'fail',{
                    msg : "发表失败"
                }));
            }
            else{
                res.send(flash(200,'success',{
                    msg : "发表成功"
                }));
            }
        })
    }


})
module.exports = router;