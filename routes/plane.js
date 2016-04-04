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
    Plane.find(function(err,content){

        res.render('plane',{title:"Migo个人健身系统--训练计划",planeData : content});
    })

});
/*训练计划详情*/
router.get('/dplane',function(req,res,next){
    res.render('dplane',{title:"Migo个人健身系统--训练计划"});
});
/*训练计划详情*/
router.get('/train',function(req,res,next){
    res.render('train',{title:"Migo个人健身系统--训练计划"});
});
module.exports = router;