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
var smushit = require('node-smushit');

/*后台管理*/
router.get('/',function(req,res,next){
    var user = req.session.user;
    if(isAdmin(req.session.user) == false){
        res.redirect('404')
    }

    res.render('admin',{title:"Migo个人健身系统"})

    
})
/*健身表格*/
router.post('/getpie', function(req, res, next){
    isAdmin(req.session.user);
    var pie = {
        people : {
            title : '会员情况',
            series : [{
                type: 'pie',
                name: '会员情况',
                data: []
            }]
        },
        plane : {
            title : '训练计划',
            series : [{
                type: 'pie',
                name: '训练计划',
                data: []
            }]
        },
        diary : {
            title : '日记情况',
            series : [{
                type: 'pie',
                name: '日记情况',
                data: []
            }]
        }
    }
    User.find(function(err, user){
        var userTrianNum = 0;
        for(var i = 0; i < user.length; i ++) {
            if (user[i].mytrain[0] != undefined) {
                userTrianNum += 1;
            }
        }
        var notplane = user.length - userTrianNum;
        console.log(notplane, userTrianNum)
        pie.people.series[0].data.push(['未提交训练计划会员', notplane], ['已提交训练计划会员', userTrianNum])
        /*健身日记*/
        var checking = [],
            checkpass = [],
            checknopass = [];
        Diary.find().sort({ 'time' : -1}).exec(function(err,content) {
            if(err){
                return;
            }
            else{
                for(var i in content){
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
                pie.diary.series[0].data.push(['待审核', checking.length], ['审核通过', checkpass.length], ['审核不通过', checknopass.length])
            }
            Plane.find(function(err,plane){
                var primary = [];
                var middle = [];
                var high = [];
                for(var k = 0; k < plane.length; k ++){
                    if(plane[k].trainLevel == '初级'){
                        primary.push(plane[k])
                    }
                    else if(plane[k].trainLevel == '中级'){
                        middle.push(plane[k])
                    }
                    else if(plane[k].trainLevel == '高级'){
                        high.push(plane[k])
                    }
                }
                console.log(primary.length);
                console.log(middle.length);
                console.log(high.length);
                pie.plane.series[0].data.push(['初级', primary.length], ['中级', middle.length], ['高级', high.length])

                res.send(flash(200,'success',{
                    msg : pie
                }));
            })

        })

    })

})
/*健身计划管理*/
router.get('/plane',function(req,res,next){
    isAdmin(req.session.user);
    Plane.find(function(err,content){
        res.render('admin-plane',{title:"Migo个人健身系统",planeData : content});
    })
})
/*添加健身计划*/
router.post('/addplane',function(req,res,next){
    isAdmin(req.session.user);
    Plane.findOne({trainName : req.body.trainName},function (err,content){
        if(content != null){
            res.send(flash(500,'fail',{
                msg : "训练计划已存在"
            }));
        }
        else{
            var newplane = new Plane(Plane);
            newplane.trainName = req.body.trainName;
            newplane.trainLevel = req.body.trainLevel;
            newplane.trainTime = req.body.trainTime;
            newplane.trainEq = req.body.trainEq;
            newplane.trainPosition = req.body.trainPosition;
            newplane.trainCalorie = req.body.trainCalorie;
            newplane.trainText = req.body.trainText;
            newplane.save(function (err) {
                if(err){
                    res.send(flash(500,'fail',{
                        msg : "提交训练失败"
                    }));
                }
                else{
                    res.send(flash(200,'fail',{
                        msg : "提交训练成功"
                    }));
                }
            })
        }
    })

})
/*添加训练图片*/
router.post('/addPlanePic',function (req,res,next) {
    isAdmin(req.session.user);
    var id = req.body.id;
    var name = req.body.name;
    var picDes = req.body.picDes;
    var pichref = req.body.pichref;
    var dataBuffer = new Buffer(pichref, 'base64');
    var filepath = 'public/images/plane/'+id+name+'.png';
    fs.writeFile(filepath, dataBuffer, function(err) {
        if(err){

            res.send(flash(500,'fail',{
                msg : "上传图片失败"
            }));
        }
        else{
            smushit.smushit(filepath);
            Plane.findOne({trainName : id},function (err,content){
                content.trainPic.push({
                    picDes : picDes,
                    pichref : 'images/plane/'+id+name+'.png'
                })
                content.save();
                res.send(flash(200,'fail',{
                    msg : "上传图片成功"
                }));
            })
        }
    })

})
/*健身计划删除*/
router.post('/deletePlane', function (req, res, next) {
    isAdmin(req.session.user);
    var id = req.body.id;
    console.log(id)
    Plane.remove({_id : id},function(err,content){
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
/*会员管理*/
router.get('/people',function(req,res,next){
    isAdmin(req.session.user);
    var user = req.session.user;
    User.find().exec(function(err,content) {
        if (err) {
            return;
        }
        else {
            console.log(content);
            for(var i = 0;i < content.length; i ++ ){
                content[i].newtime = moment(content[i].regTime).format("YYYY-MM-DD");
            }

            res.render('admin-people',{title:"Migo个人健身系统",userContent : content})
        }
    })
})
/*会员删除*/
router.post('/deleteUser',function(req,res,next){
    isAdmin(req.session.user);
    var id = req.body.userId;
    User.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})
/*日记管理*/
router.get('/diary',function(req,res,next){
    isAdmin(req.session.user);
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
/*日记审核*/
router.post('/checkDiary',function (req,res,next) {
    isAdmin(req.session.user);
    var id = req.body.id;
    var status = req.body.status;
    console.log(id,status)
    Diary.update({_id : id},{state:status},function (err,content) {
        if(err){

            res.send(flash(500,'error',{
                msg : "审核失败"
            }));
        }
        else{
            res.send(flash(200,'success',{
                msg : "审核成功"
            }));
        }
    })
})
/*动态管理*/
router.get('/dynamic',function(req,res,next){
    isAdmin(req.session.user);
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
    isAdmin(req.session.user);
    var id = req.body.dynamicId;
    Dynamic.remove({_id : id},function(err,content){
        console.log(content);
        res.send(flash(200,'success',{
            msg : "删除成功"
        }));
    })
})

/*判断是否为admin*/
function isAdmin (user){
    if(user){
        if(user == 'admin'){
            return true;
        }
        else{
            return false;
        }
    }
    else {
        return false;
    }

}
module.exports = router;
