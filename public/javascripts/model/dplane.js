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
        //参加训练
        $('.get-train').click(function () {
            var id = $(this).find('input[type="hidden"]').val();
            $.ajax({
                url : '/getTrain',
                type : 'POST',
                data : {id : id},
                success : function (msg) {
                    if(msg.status.code == '200'){
                        //console.log(msg)
                        window.location.href = "/train/:"+msg.data.msg
                    }
                    else{
                        alert("你已经参加过该训练计划");
                        window.location.href = "/train/:"+msg.data.msg
                    }
                },
                error : function () {

                }
            })
        })
    });
})