/* global Buffer */
var express = require('express');
var User = require('../db/user');
var router = express.Router();
var fs = require('fs');
var mcrypto = require('../util/pass');
var smushit = require('node-smushit');
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
    console.log('user' + user);
    console.log('pass' + pass)
    User.findOne({name : user},function(err,content){
        if(content != null){
            console.log(content);
            if(content.pass == mcrypto.md5Password(pass)){
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
            smushit.smushit(filepath);
            User.findOne({name : user},function(error,content){
                if(content != null){
                    res.end("用户名已存在！");
                }
                else{
                    //数据存储
                    var newuser = new User(User);
                    console.log('存储前名字'+newuser)
                    newuser.name = user;
                    newuser.pass = mcrypto.md5Password(pass);
                    console.log('存储前密码'+newuser.pass)
                    newuser.userlogo = userlogo;
                    newuser.regTime = Date.now();
                    newuser.yesCalorie = 0;
                    console.log('存储www'+newuser)
                    newuser.save(function(err) {
                        if (err) {
                            res.write("注册失败!");
                            res.end();
                        }
                        req.session.user = user;
                        console.log('注册成功' + req.session.user)
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
