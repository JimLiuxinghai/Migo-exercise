/**
 * Created by jimliu on 2016/2/9.
 */
var express = require('express');
var User = require('../db/user');
var fs = require('fs');
var flash = require('../util/flash.js');
var Dynamic = require('../db/dynamic');
var router = express.Router();
router.get('/setprofile',function(req,res,next){
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    if(user){
        res.render('setprofile', {title: "Migo个人健身系统--个人中心", user: navuser});
        var dynamin = [];
        Dynamic.find().sort({ 'time' : -1 }).exec(function(err,content) {
            if (err) {
                dynamin = [];
            }
            else {
                for (var i = 0; i < content.length; i++) {
                    content[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                    dynamin.push(content[i]);

                }
            }
        })

    }
    else{
        //res.render('login',{title:"Migo个人健身系统--个人中心"});
        res.redirect('login')
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
        function(err,content){
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
//修改头像
router.post('/updateLogo',function(req,res,next){
    var user = req.session.user;
    var pic = req.body.head;
    pic = pic.replace(/^data:image\/\w+;base64,/, "");
    var filepath = 'public/images/user/'+user+'.png';
    fs.unlink(filepath,function(err){
        if(err){
            res.send(flash(500,'success',{
                msg : "修改头像失败"
            }));
        }
        else{
            fs.writeFile(filepath, pic, function(err) {
                if(err){
                    res.send(flash(500,'success',{
                        msg : "修改头像失败"
                    }));
                }
                else{
                    res.send(flash(200,'success',{
                        msg : "成功",
                        imgUrl : filepath
                    }));

                }
            })
        }
    })

})
//修改密码
router.post('/vPass',function(req,res,next){
    var user = req.session.user;
    var pass = req.body.nowpass;
    User.findOne({name:user},function(err,content){
        if(err){
            res.send(flash(500,'fail',{
                msg : "保存失败"
            }));
        }
        else{
            if(content.pass == pass){
                res.send(flash(200,'success',{
                    msg : "成功"
                }));
            }
            else{
                res.send(flash(500,'success',{
                    msg : "原密码错误"
                }));
            }
        }
    })
})
router.post('/updatePass',function(req,res,next){
    var user = req.session.user;
    var pass = req.body.nowpass;
    User.update({'name' : user, 'pass' : pass},function (err,content){
        console.log(content)
        if(err){
            console.log(err)
            res.send(flash(500,'fail',{
                msg : "密码修改失败哦，请稍候重试"
            }));
        }
        else{
            res.send(flash(200,'success',{
                msg : "成功"
            }));
        }
    })

})
module.exports = router;