/* global Buffer */
var express = require('express');
var User = require('../db/user');
var router = express.Router();
var fs = require('fs');
var hash = require('../util/pass').hash;
/*登录注册*/
router.get('/login',function(req,res,next){
    res.render('login',{title:"Migo个人健身系统--登录"});
});
router.get('/reg',function(req,res,next){
    res.render('reg',{title:"Migo个人健身系统--注册"});
});

/*登录*/
router.post('/login',function(req,res,next){
    var user = req.body.username;
    var pass = req.body.password;
    
    User.findOne({name : user},function(err,content){
        if(content != null){
            if(content.pass == pass){
                req.session.user = user;
                res.write("success");
                res.end();
            }
            else{
                res.end("用户名或密码错误！");
            }
        }
        else{
            res.end("用户名不存在！");
        }
    })
    
})
/*注册*/
router.post('/reg',function(req,res,next){
    var user = req.body.username;
    var pass = req.body.password;
    var userhead = req.body.userlogo;
    userhead = userhead.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(userhead, 'base64');
    var filepath = 'public/images/user/'+user+'.png';
    fs.writeFile(filepath, dataBuffer, function(err) {
        if(err){
          res.write("注册失败!");
          res.end();
        }else{
            var userlogo = user +'.png';
            User.findOne({name : user},function(error,content){
                if(content != null){
                    res.end("用户名已存在！");
                }
                else{
                    //数据存储
                    var newuser = new User(User);
                    newuser.name = user;
                    newuser.pass = pass;
                    newuser.userlogo = userlogo;
                    newuser.regTime = Date.now();
                    newuser.yesCalorie = 0;
                    newuser.save(function(err) {
                        if (err) {
                            res.write("注册失败!");
                            res.end();
                        }
                        req.session.user = user;

                        res.write("success");
                        res.end();
                    });
                }
            })
        }
    });


})

//退出登录
router.get('/logout',function(req,res,next){
    delete req.session.user;

    return res.redirect('/');
});
module.exports = router;
