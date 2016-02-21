/**
 * Created by jimliu on 2016/2/9.
 */
var express = require('express');
var User = require('../db/user');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();
router.get('/setprofile',function(req,res,next){
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    if(user){
        res.render('setprofile',{title:"Migo个人健身系统--个人中心",user:navuser});
    }
    else{
        res.render('setprofile',{title:"Migo个人健身系统--个人中心"});
    }

});
router.post('/saveData',function(req,res,next){
    var user = req.session.user;
    var sex = req.body.sex;
    var age = req.body.age;
    var height = req.body.height;
    var weight = req.body.weight;
    var signature = req.body.signature;
    var BMI = height/weight;
    User.update({'name' : user,'sex':sex,'age':age,'height':height,'weight':weight,'signature':signature,'BMI':BMI},
        function(err,doc){
            if(err){
                res.send(flash(500,'fail',{
                    msg : "保存失败"
                }));
            }
            else{
                res.send(flash(200,'success',{
                    msg : "成功"
                }));
            }
    })
});
//router.post('/updateLogo',function(req,res,next){
//
//})
module.exports = router;