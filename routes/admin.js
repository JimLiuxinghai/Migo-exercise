/**
 * Created by jimliu on 2016/3/19.
 */
var express = require('express');
var Diary = require('../db/diary');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var fs = require('fs');
var flash = require('../util/flash.js');
var router = express.Router();

/*后台管理*/
router.get('/admin',function(req,res,next){
    var user = req.session.user;
    res.render('admin',{title:"Migo个人健身系统",pieData:'1'})
})
/*健身计划管理*/
router.get('/admin/plane',function(req,res,next){
    var user = req.session.user;
    res.render('admin-plane',{title:"Migo个人健身系统"})
})
/*会员管理*/
router.get('/admin/people',function(req,res,next){
    var user = req.session.user;
    res.render('admin-people',{title:"Migo个人健身系统"})
})
/*日记管理*/
router.get('/admin/diary',function(req,res,next){
    var user = req.session.user;
    res.render('admin-diary',{title:"Migo个人健身系统"})
})
module.exports = router;
