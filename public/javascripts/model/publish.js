/**
 * Created by jimliu  on 2016/2/7.
 */

require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"));
            //清除错误信息
            var clearErr = function(){
                $("input").focus(function(){
                    $(".errorMsg").html("");
                })
                $("textarea").focus(function(){
                    $(".errorMsg").html("");
                })
            }();
            //添加图片
            var file = document.getElementById('uphead');
            util.displayImg(file,$(".result"),$("#img-src"));
        }();

        //发表日记
        $(".submit").click(function(){
            var errorMsg;
            if($(".title").val() == ""){
                errorMsg = '请填写日记标题。'
                $(".errorMsg").html(errorMsg).removeClass('display-n');
                return false;
            }
            else if($("#editor").val() == ""){
                errorMsg = '请填写日记正文。'
                $(".errorMsg").html(errorMsg).removeClass('display-n');
                return false;
            }
            else{
                var data;
                if($("#img-src").val() == ''){
                    data = {
                        title : $(".title").val(),
                        text : $("#editor").val()
                    }
                }
                else{
                    data = {
                        title : $(".title").val(),
                        text : $("#editor").val(),
                        img : $("#img-src").val()
                    }
                }
                //上传
                var resData = util.getData('/dpub',"POST",data);
                if(resData.status.code == "200"){
                    $(".mask").show();
                    setTimeout(window.location.href='/diary',7000);
                }
                else{
                    $(".errorMsg").html(resData.status.message).removeClass('display-n');
                }


            }
        })
    })
})