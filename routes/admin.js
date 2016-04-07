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
    var pieData = {};
    if(true){
        console.log(pieData);
        res.render('admin',{title:"Migo个人健身系统",pieData: JSON.stringify(pieData)})
    }
    else{
        res.redirect(404)
    }
})
/*admin数据*/
router.post('/getPie', function (res, req, next){
    //var title,series;
    //title = '人员管理';
    //series = {
    //    type: 'pie',
    //    name: 'Browser share',
    //    data: [
    //        ['Firefox',   45.0],
    //        ['IE',       26.8],
    //        {
    //            name: 'Chrome',
    //            y: 12.8,
    //            sliced: true,
    //            selected: true
    //        },
    //        ['Safari',    8.5],
    //        ['Opera',     6.2],
    //        ['Others',   0.7]
    //    ]
    //};
    //res.send(flash(200,'success',{
    //    title:'aaa',
    //    series:'gggg'
    //}));
    res.send('11111')
    //console.log(1111)
})
/*健身计划管理*/
router.get('/plane',function(req,res,next){
    //var user = req.session.user;
    Plane.find(function(err,content){

        res.render('admin-plane',{title:"Migo个人健身系统",planeData : content});
    })
})
/*添加健身计划*/
router.post('/addplane',function(req,res,next){
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
/*日记审核*/
router.post('/checkDiary',function (req,res,next) {
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
