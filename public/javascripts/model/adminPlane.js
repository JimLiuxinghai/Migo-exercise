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
        //添加图片
        var i = 1;
        var picdom = '<div class="row">'+
                        '<div class="col6 offset3">'+
                            '<input type="file" accept="image/*" name="plane'+i+'" />'+
                        '</div>'+
                        '<div class="col12">'+
                            '<input class="form-control" type="text" placeholder="图片描述" name="plane'+i+'" />'+
                        '</div>'+
                        '<div class="col2">'+
                            '<input type="button" value="上传" class="btn btn-info ml20">'+
                        '</div>'+
                    '</div>';
        $(".addpic").click(function(){
            $(".onepic").append(picdom);
            i++;
        })
        //上传图片
        $('.btn').click(function(){

        })
    });

})
