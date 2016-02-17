/**
 * Created by jimliu on 2016/2/8.
 */
require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"));
        }();
        var id = util.getUrlParam('id');
        var resData = util.getData('/diaryid',"POST",{id : id});
        debugger;
        console.log(resData.data.msg[0].diaryTitle)
        $(".title").html(resData.data.msg[0].diaryTitle);
        $(".name").html(resData.data.msg[0].username);
        $(".text").html(resData.data.msg[0].diaryText);
        $(".time").html(resData.data.msg[0].time);
    });
})