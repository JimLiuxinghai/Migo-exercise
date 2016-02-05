/**
 * Created by jim on 2016/2/2.
 */
/**
 * Created by jimliu on 2016/1/22.
 */
require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"));
            //左侧导航
            $(".left-nav").find('li').click(function(){
                var data = $(this).attr("data");
                $(".col18").fadeOut();
                $("."+data).fadeIn();
            });
            //日记点击
            $(".list-container").click(function(){
                $(".diary-list").hide();
                $(".diary-container").fadeIn();

            });
            $(".back").click(function(){
                $(".diary-container").fadeOut();
                $(".diary-list").slideDown();

            })
        }();

    })
})