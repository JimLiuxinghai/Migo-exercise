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
        var planeData = {
            pos : '全身',
            level : "全部"
        }
        $('.t-pos').find('span').click(function () {
            $('.t-pos').find('span').removeClass('bg-green-4d font-white');
            $(this).addClass('bg-green-4d font-white');
            planeData.pos = $(this).attr('data');
            postData();
        })
        $('.level').find('span').click(function () {
            $('.level').find('span').removeClass('bg-green-4d font-white');
            $(this).addClass('bg-green-4d font-white');
            planeData.level = $(this).attr('data');
            postData();
        })
        //发送请求
        function postData () {
            $.ajax({
                url : '/choosePlane',
                data : planeData,
                type : 'POST',
                success : function (msg) {
                    for(var i = 0;i < msg.length; i ++){
                        var plane = '<div class="">'
                    }
                }
            })
        }
        //dom节点

    });
})