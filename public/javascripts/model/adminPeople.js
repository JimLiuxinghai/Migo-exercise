/**
 * Created by jimliu on 2016/3/19.
 */
require(['jquery','highcharts','util','domReady'],function($,highcharts,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".left"),80);
            $('.admin-nav').find('li:eq(2)').find('a').css('color','#4DB3A2');
        }();
        //删除
        $(".delete").click(function(e){
            e.stopPropagation();
            var id = $(this).find('input').val();
            alert(id);
            $.ajax({
                url : '/admin/deleteUser',
                type : 'POST',
                data : {userId : id},
                success : function(msg){
                    if(msg.status.code == '200'){
                        //$(".mask").fadeIn();
                        setTimeout(window.location.href='/admin/people',2000);
                    }
                }
            })

        })
    });

})
