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
                $(".check-btn").show();
           }
           $(".diaryTitle").html($(this).find(".title").html())
           $(".diaryTime").html($(this).find(".time").html())
           $(".diaryText").html($(this).find("input[name='text']").val())
           $(".diary-id").val($(this).find("input[name='id']").val());
           $(".diary-content").hide();
           $(".diary-container").fadeIn();

       });
        //日记审核
        $('.check-diary').click(function () {
            var id = $('.diary-id').val();
            var status = $("input[name='check']:checked").val();
            debugger;
            $.ajax({
                url : '/admin/checkDiary',
                type : "POST",
                data : {id : id,status:status},
                success : function (msg) {
                    if(msg.status.code == "200"){
                        $('.mask').fadeIn();
                        window.location.href = "/admin/diary";
                    }
                }
            })
        });
        //返回日记列表
        $(".back").click(function(){
            $(".check-btn").hide();
            $(".diaryTitle").html("");
            $(".diaryTime").html("");
            $(".diaryText").html("");
            $(".diary-id").val("");
            $(".diary-container").fadeOut();
            $(".diary-content").slideDown();
        })
    });

})
