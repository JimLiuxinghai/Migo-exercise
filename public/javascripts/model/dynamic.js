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
        $(".publish").click(function(){
            if($(".dynamic").val() != ""){
                var dData = {dynamic : $(".dynamic").val()};
                var resData = util.getData('/pdynamic','POST',dData);
                if(resData.status.code == '200'){
                    window.location.href = "/dynamic";
                }
            }
        })
    })
})