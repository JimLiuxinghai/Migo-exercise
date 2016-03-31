/**
 * Created by jim on 2016/2/8.
 */
var express = require('express');
var Dynamic = require('../db/dynamic');
var moment = require('moment');
var flash = require('../util/flash.js');
var router = express.Router();

/*健身动态*/
router.get('/dynamic',function(req,res,next){
    var title = "Migo个人健身系统--健身动态";
    var user = req.session.user;
    var navuser = {
        user : user,
        userlogo : 'images/user/'+user+'.png'
    }
    var dynamin = [];
    Dynamic.find().sort({ 'time' : -1 }).exec(function(err,content){
        if(err){
            dynamin = []
        }
        else{
            for(var i = 0; i < content.length; i++){
                content[i].newtime = moment(content[i].time).format("YYYY-MM-DD HH时mm分");
                dynamin.push(content[i]);
            }
        }
        if(user){
            res.render('dynamic',{title:title,dynamins:dynamin,user:navuser});
        }
        else{
            res.render('dynamic',{title:title,dynamins:dynamin});
        }

    })
    
});
/*动态点赞*/
router.post('/dynamicAssist',function(req,res,next){
    var id = req.body.id;
    var num = req.body.num;

    Dynamic.update({'_id' : id},{ 'trendAssist' : num},function(err,content){
        if(err){
            console.log(err)
            res.send(flash(500,'error',{
                msg : "点赞失败"
            }));
        }
        else{
            res.send(flash(200,'success',{
                msg : "点赞成功"
            }));
        }
    })



});
/*发表健身动态*/
router.post('/pdynamic',function(req,res,next){
    var user = req.session.user;
    var time = moment();
    var trend = req.body.dynamic;
    var newd = new Dynamic(Dynamic);
    newd.trend = trend;
    newd.username = user;
    newd.time = time;
    newd.trendAssist = 0;
    newd.save(function(err) {
        if (err) {
            res.send(flash(500,'error',{
                msg : "发布失败"
            }));
        }
        res.send(flash(200,'success',{
            msg : "发布成功"
        }));
    });

})
module.exports = router;