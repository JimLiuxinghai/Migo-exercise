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
            pos : '全部',
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

            var result = "";
            var plane = "";
            $.ajax({
                url : '/choosePlane',
                data : planeData,
                type : 'POST',
                success : function (msg) {
                    if(msg.plane.length == 0){
                        var empty = '<h2 class="tc mt20">对不起，暂时没有这种类型的计划</h2>'
                        $('.plane-list').html(empty);
                        return;
                    }
                    for(var i = 0;i < msg.plane.length; i ++){
                        plane = '<a href="dplane/:'+msg.plane[i]._id+'">'+
                                        '<div class="col6 pl20 pr20 pt20">'+
                                            '<div class="box-s-2">'+
                                                '<div class="pos-r ht120 overflow-h">'+
                                                    '<img src="/'+msg.plane[i].trainPic[0].pichref+'" class="per100">'+
                                                '</div>'+
                                                '<div class="border-b border-l border-r">'+
                                                    '<p class="font14 tc">'+
                                                        msg.plane[i].trainName+
                                                        '<span class="vicons font-red">&#xe65f;</span>'+
                                                    '</p>'+
                                                    '<p class="font-6 tc">'+
                                                        '<span class="mr10">'+msg.plane[i].trainEq+'</span>'+
                                                        '<span class="mr10">'+msg.plane[i].trainLevel+'</span>'+
                                                        '<span class="mr10">'+msg.plane[i].trainUser.length+'人参加训练</span>'+
                                                    '</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</a>';
                        result += plane;
                    }
                    $('.plane-list').html("");
                    $('.plane-list').append(result);

                }
            })
        }
    });
})