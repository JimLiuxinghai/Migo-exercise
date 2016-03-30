/**
 * Created by jimliu on 2016/3/19.
 */
require(['jquery','highcharts','util','domReady'],function($,highcharts,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".left"),0);
            $('.admin-nav').find('li:eq(1)').find('a').css('color','#4DB3A2');
        }();
        $(".plane-type").click(function () {
            $(".plane").hide();
            var data = $(this).attr("data");
            console.log($("."+data))
            $("."+data).fadeIn();
        })
    });

})
