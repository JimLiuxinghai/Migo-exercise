/**
 * Created by jimliu on 2016/3/19.
 */
var express = require('express');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var User = require('../db/user');
var Plane = require('../db/plane');
var moment = require('moment');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();

/*后台管理*/
router.get('/',function(req,res,next){
    var user = req.session.user;
    if(true){
        res.render('admin',{title:"Migo个人健身系统",pieData:'1'})
    }
    else{
        res.redirect(404)
    }

})
/*健身计划管理*/
router.get('/plane',function(req,res,next){
    var user = req.session.user;
    res.render('admin-plane',{title:"Migo个人健身系统"})
})
/*添加健身计划*/
router.post('/addplane',function(req,res,next){

})
/*会员管理*/
router.get('/people',function(req,res,next){
    var user = req.session.user;
    User.find().exec(function(err,content) {
        if (err) {
            return;
        }
        else {
            console.log(content)
            res.render('admin-people',{title:"Migo个人健身系统",userContent : content})
        }
    })
})
/*会员删除*/
/*动态删除*/
router.post('/deleteUser',function(req,res,next){
    var id = req.body.userId;
    console.log(id);
    User.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
/*日记管理*/
router.get('/diary',function(req,res,next){
    var user = req.session.user;
    var checking = [],
        checkpass = [],
        checknopass = [];
    Diary.find().sort({ 'time' : -1}).exec(function(err,content) {
        if(err){
            return;
        }
        else{
            for(var i in content){
                content[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                if(content[i].state == "0"){
                    checking.push(content[i])
                }
                else if(content[i].state == "1"){
                    checkpass.push(content[i]);
                }
                else if(content[i].state == "2"){
                    checknopass.push(content[i]);
                }
            }
            res.render('admin-diary',{title:"Migo个人健身系统",checking:checking,checkpass:checkpass,checknopass:checknopass})
        }
    })

})
/*动态管理*/
router.get('/dynamic',function(req,res,next){
    var user = req.session.user;
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
        console.log(dynamic)
        res.render('admin-dynamic',{title:"Migo个人健身系统--健身日记",dynamic:dynamic});

        }
    })
})
/*动态删除*/
router.post('/deleteDynamic',function(req,res,next){
    var id = req.body.dynamicId;
    console.log(id);
    Dynamic.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
/*判断是否为admin*/
function isAdmin (user){
    if(user == 'admin'){
        return;
    }
    else{
        res.redirect(404);
    }
}
module.exports = router;
