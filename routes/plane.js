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
var hash = require('../util/pass').hash;
var router = express.Router();

/*训练计划*/
router.get('/plane',function(req,res,next){
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    Plane.find(function(err,content){
        console.log(content)
        res.render('plane',{title:"Migo个人健身系统--训练计划",user : navuser,planeData : content});
    })

});
/*选择健身计划*/
router.post('/choosePlane', function(req, res, next){
    var pos = req.body.pos;
    var level = req.body.level;
    if(!level){
        Plane.find({trainPosition : pos}).exec(function(err,content) {
            console.log(content)
            res.send({plane : content})
        });
    }
    else{
        Plane.find({trainPosition : pos,trainLevel : level}).exec(function(err,content) {
            console.log(content)
            res.send({plane : content})
        });
    }

});
/*训练计划详情*/
router.get('/dplane/:id',function(req,res,next){
    var id = req.params.id.substr(1);
    Plane.findOne({_id : id},function (err,content){
        console.log(content)
        res.render('dplane',{title:"Migo个人健身系统--训练计划", plane : content});
    })

});
/*训练计划详情*/
router.get('/train/:id',function(req,res,next){
    var id = req.params.id.substr(1);
    var user = req.session.user;
    var planeData;

    console.log(navuser)
    Plane.findOne({_id : id},function (err,content){
        planeData = content;
        content.trainUser.push({
            name : user
        })
        content.save();
        User.findOne({name : user}, function (err,content){
            content.mytrain.push({
                plane : id
            });
            content.save();
            res.render('train',{title:"Migo个人健身系统--参加训练", plane : planeData});
        })
    })
});
module.exports = router;