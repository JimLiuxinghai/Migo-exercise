/**
 * Created by jimliu on 2016/2/9.
 */
var express = require('express');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();

/*健身日记*/
router.get('/usercenter',function(req,res,next){
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
            var dynamic = [];
            Dynamic.find().sort({ 'time' : -1 }).exec(function(err,content) {
                if (err) {
                    dynamic = [];
                }
                else {
                    for (var i = 0; i < content.length; i++) {
                        content[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                        dynamic.push(content[i])
                    }
                    if(user){
                        console.log(dynamic)
                        res.render('usercenter',{title:"Migo个人健身系统--健身日记",user : navuser,diaryData : diary,dynamic:dynamic});
                    }
                }
            })

        }

    })


});

module.exports = router;