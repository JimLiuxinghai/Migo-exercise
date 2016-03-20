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

/*健身日记*/
router.get('/admin',function(req,res,next){
    var user = req.session.user;
    res.render('admin',{title:"Migo个人健身系统",data:'1'})
})
module.exports = router;