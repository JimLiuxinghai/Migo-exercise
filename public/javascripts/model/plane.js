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
                    var result;
                    for(var i = 0;i < msg.plane.length; i ++){
                        var plane = '<a href="dplane/:'+msg.plane[i]._id+'">'+
                                        '<div class="col6 pl20 pr20 pt20">'+
                                            '<div class="box-s-2">'+
                                                '<div class="pos-r ht120 overflow-h">'+
                                                    '<img src="/msg.plane[i].trainPic[0].pichref" class="per100">'+
                                                '</div>'+
                                                '<div class="border-b border-l border-r">'+
                                                    '<p class="font14 tc">'+
                                                        msg.plane[i].trainName+
                                                        '<span class="vicons font-red">&#xe65f;</span>'
                                                    '</p>'
                    }
                }
            })
        }
        //dom节点

    });
})