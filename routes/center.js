/**
 * Created by jimliu on 2016/2/9.
 */
var express = require('express');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var Plane = require('../db/plane');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();

/*健身日记*/
router.get('/usercenter',function(req,res,next){
    //获取用户
    var user = req.session.user;
    var myplane = [];
    if(!user){
        res.redirect('/login');
    }
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }

    Diary.find({username : user}).sort({ 'time' : -1 }).exec(function(err,content){
        if(err){
            res.send(flash(500,'fail',{
                msg : "获取失败"
            }));
        }
        else{
            var diary = content;
            for(var i = 0; i < diary.length;i ++){
                diary[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                diary[i].text = diary[i].diaryText.substr(0,80);
            }
            var dynamic = [];
            Dynamic.find({username:user}).sort({ 'time' : -1 }).exec(function(err,content) {
                if (err) {
                    dynamic = [];
                }
                else {
                    for (var i = 0; i < content.length; i++) {
                        content[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                        dynamic.push(content[i])
                    }
                    Plane.find().exec(function(err,content){
                        for(var i = 0; i < content.length; i ++){
                            for(var j = 0; j < content[i].trainUser.length; j ++){
                                if(content[i].trainUser[j].name == user){
                                    myplane.push(content[i]);

                                }
                                else{
                                    return;
                                }
                            }
                        }
                        if(user){
                            console.log(myplane)
                            res.render('usercenter',{title:"Migo个人健身系统--健身日记",user : navuser,diaryData : diary,dynamic:dynamic, myplane : myplane});
                        }
                    })

                }
            })

        }

    })


});
/*删除日记*/
router.post('/deletDiary',function(req,res,next){
    var id = req.body.diaryId;
    console.log(id);
    Diary.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
/*删除动态*/
router.post('/deletDynamic',function(req,res,next){
    var id = req.body.dID;
    console.log(id);
    Dynamic.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
module.exports = router;