/**
 * Created by Administrator on 2016/4/4.
 */

require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"),186);
        }();
        //选取健身计划
        //发送请求
        function postData () {
            
        }
    });
})