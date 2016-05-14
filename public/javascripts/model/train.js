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
        //点击开始训练
        trainTime = trainTime*60;
        $(".begin").click(function(){
            var time = 5;
            //var time = trainTime;
            var self = $(this);
            self.attr("disabled","disabled");
            var timer = setInterval(function () {
                if(time == 0){
                    clearInterval(timer);
                    self.removeAttr("disabled");
                    self.hide();
                    $(".over").show();
                }
                else{
                    time = parseInt(time) - 1;
                    var over = time+"秒后，结束训练";
                    self.html(over);
                }

            },1000)
        })
        $(".over").click(function () {
            var calorie = $(this).find('input[type="hidden"]').val();
            $.ajax({
                url : '/overTrain',
                type : 'POST',
                data : {calorie : calorie},
                success : function(msg){
                    if(msg.status.code){
                        alert("训练完成")
                        window.location.href = "/dynamic";
                    }
                }
            })
        })

    });
})