/**
 * Created by jimliu on 2016/2/8.
 */
require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"),186);
        }();
        //点赞
        $(".assist").click(function(){
            var _self = $(this);
            var id = _self.find('input').val();
            var num = parseInt(_self.find('span').html())+1;
            $.ajax({
                url : '/diaryAssist',
                type : 'POST',
                data : {id : id,num:num},
                success : function (msg){
                    if(msg.data.msg == '点赞成功'){
                        _self.find('span').html(num);
                    }

                }
            })
        })
    });
})