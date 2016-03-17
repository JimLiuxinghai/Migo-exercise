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
                var _self = this;
                getDiary(_self);


            });
            $(".back").click(function(){
                $(".diary-container").fadeOut();
                $(".diary-list").slideDown();

            })
        }();

    })

    //进入日记详情
    function getDiary(dom){
        $(".diaryTitle").html($(dom).find('input[name="diaryTitle"]').val());
        $(".diaryTime").html($(dom).find('input[name="diaryTime"]').val());
        $(".diaryText").html($(dom).find('input[name="diaryText"]').val());

    }

    //日记删除
    $(".deletDiary").click(function(e){
        e.stopPropagation();
        var id = $(this).find('input').val();
        $.ajax({
            url : '/deletDiary',
            type : 'POST',
            data : {diaryId : id},
            success : function(msg){
                if(msg.status.code == '200'){
                    $(".mask").fadeIn();
                    setTimeout(window.location.href='/usercenter',2000);
                }
            }


        })

    })
})



