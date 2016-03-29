/**
 * Created by jimliu on 2016/3/19.
 */
require(['jquery','highcharts','util','domReady'],function($,highcharts,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".left"),80);
            $('.admin-nav').find('li:eq(3)').find('a').css('color','#4DB3A2');
        }();
        //切换日记列表
        $(".diary-panel").click(function () {
            $(".diary-list").hide();
            var data = $(this).attr("data");
            $("."+data).fadeIn();
        })
        //展开日记详情
       $(".diary-list").find('a').click(function(){
           var type = $(this).attr("type");
           if(type == 'checking'){

           }
           $(".diary-content").hide();
           $(".diary-container").fadeIn();

       })
        $(".back").click(function(){

            $(".diary-container").fadeOut();
            $(".diary-content").slideDown();
        })
    });

})
