var express = require('express');
var User = require('../db/user');
var router = express.Router();
var multiparty = require('multiparty');
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
var reg = function(){
    var userLogo;
//     /*上传头像*/
//     router.post('/uploadUser',function(req,res,next){
//         var form = new multiparty.Form({uploadDir: './public/images/user'});
//         //下载后处理
//         form.parse(req, function(err, fields, files) {
//             var filesTmp = JSON.stringify(files,null,2);

//             if(err){
//                 console.log('parse error: ' + err);
//             } else {
//                 var inputFile = files.inputFile[0];
//                 userLogo = inputFile.originalFilename;
// //                var dstPath = './public/images/' + inputFile.originalFilename;
// //                //重命名为真实文件名
// //                res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
// //                res.end(uploadedPath);
//                 res.end('success');
//             }
//         });
//     })
    /*注册*/
    router.post('/reg',function(req,res,next){
        var user = req.body.username;
        var pass = req.body.password;
        User.findOne({name : user},function(error,content){
            if(content != null){
                res.end("用户名已存在！");
            }
            else{
                //数据存储
                var newuser = new User(User);
                newuser.name = user;
                newuser.pass = pass;
                newuser.userlogo = userLogo;
                newuser.save(function(err) {
                    if (err) {
                        res.write("注册失败!");
                        res.end();
                    }
                    req.session.user = user;
                    //console.log(regname);
                    console.log('数据保存成功');

                    res.write("success");
                    res.end();
                });
            }
        })

    })
}();

//退出登录
router.get('/logout',function(req,res,next){
    delete req.session.user;

    return res.redirect('/');
});
module.exports = router;
