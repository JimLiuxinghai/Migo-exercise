/**
 * Created by Administrator on 2016/4/3.
 */
var express = require('express');
var flash = require('../util/flash.js');
var User = require('../db/user');
var Diary = require('../db/diary');
var Plane = require('../db/plane');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var router = express.Router();


/*训练计划*/
router.get('/plane',function(req,res,next){
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    Plane.find(function(err,content){
        if(user){
            res.render('plane', {title:"Migo个人健身系统--训练计划",user: navuser,planeData: content});
        }
        else{
            res.render('plane', {title:"Migo个人健身系统--训练计划", planeData: content});
        }
    })

});
/*选择健身计划*/
router.post('/choosePlane', function(req, res, next){
    var pos = req.body.pos;
    var level = req.body.level;
    if(level == "全部"){
        if(pos == "全部") {
            Plane.find(function(err,content) {
                console.log(content)
                res.send({plane : content})
            });
        }
        else{
            Plane.find({trainPosition : pos}).exec(function(err,content) {
                console.log(content)
                res.send({plane : content})
            });
        }

    }
    else{
        if(pos == "全部") {
            Plane.find({trainLevel : level}).exec(function(err,content) {
                console.log(content)
                res.send({plane : content})
            });
        }
        else {
            Plane.find({trainPosition : pos,trainLevel : level}).exec(function(err,content) {
                console.log(content)
                res.send({plane : content})
            });
        }

    }

});
/*训练计划详情*/
router.get('/dplane/:id',function(req,res,next){
    var user = req.session.user;
    var id = req.params.id.substr(1);
    Plane.findOne({_id : id},function (err,content){
        var navuser = {
            user : user,
            userlogo : 'images/user/'+user+'.png'
        }
        if(user) {
            res.render('dplane',{title:"Migo个人健身系统--训练计划", user: navuser, plane : content});
        }
        else{
            res.render('dplane',{title:"Migo个人健身系统--训练计划", plane : content});
        }

    })

});
/*参加训练*/
router.post('/getTrain',function(req,res,next){
    var id = req.body.id;
    var user = req.session.user;
    Plane.findOne({_id : id},function (err,content){
        for(var i = 0; i < content.trainUser.length; i ++){
            if(content.trainUser[i].name == user){
                res.send(flash(500,'fail',{
                    msg : "你已经参加了该训练计划。"
                }));
                return false;
            }
        }
        User.findOne({name : user}, function(err,userCon){
            userCon.mytrain.push({
                name : id
            })
            userCon.save();
        })
        content.trainUser.push({
            name : user
        })
        content.save();
        res.send(flash(200,'success',{
            msg : content._id
        }));
    })
});
/*训练内容*/
router.get('/train/:id', function (req, res, next){
    var id = req.params.id.substr(1);
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    };
    Plane.findOne({_id : id}, function(err, content){
        if(user) {
            console.log(content);
            res.render('train',{title:"Migo个人健身系统--训练计划", user: navuser, plane : content});
        }
        else {
            res.render('train',{title:"Migo个人健身系统--训练计划", plane : content});
        }
    })
})

/*结束训练*/
router.post('/overTrain', function(req, res, next){
    var user = req.session.user;
    var calorie = parseInt(req.body.calorie);
    var now = moment().format("YYYY-MM-DD");
    User.findOne({name : user}, function(err, content){
        var userCalorie = content.calorie;
        if(err) {
            res.send(flash(500,'fail',{
                msg : "网络故障"
            }));
        }
        else{
            if(userCalorie.length == 0){
                userCalorie.push({
                    time : now,
                    calorie : calorie
                })
            }
            else{
                var hasNow = false;
                for(var i = 0; i < userCalorie.length; i ++){
                    if(userCalorie[i].time == now){
                        hasNow = true;
                        console.log(userCalorie[i].time)
                        userCalorie[i].calorie += calorie;
                        console.log(userCalorie[i].calorie)
                    }
                    
                }
                if(!hasNow) {
                    userCalorie.push({
                        time : now,
                        calorie : calorie
                    })
                }

            }
            content.calorie = userCalorie;
            content.save();
            res.send(flash(200,'success',{
                msg : "参加成功"
            }));
        }


    })

})

module.exports = router;