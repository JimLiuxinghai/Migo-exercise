/**
 * Created by jimliu on 2016/2/3.
 */
require(['jquery','util','domReady'],function($,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"));
            //左侧导航
            $(".left-nav").find('li').click(function(){
                $(".left-nav").find('li').removeClass('border-l-p');
                $(this).addClass("border-l-p");
                var data = $(this).attr("data");
                $(".col18").hide();
                $("."+data).fadeIn();
            });
            //添加表单信息


        }();
        //清除错误信息
        var clearErr = function(){
            $("input").focus(function(){
                $(".errorMsg").html("");
            })
        }();
        //验证个人资料表单
        function validate(){
            var errorMsg;
            var age = $("input[name='age']").val();
            var height = $("input[name='height']").val();
            var weight = $("input[name='weight']").val();
            if(parseInt(age) == NaN||parseInt(height) == NaN||parseInt(weight) == NaN){
                return errorMsg = "请输入正确的格式";
            }
        }
        //添加个人资料
        var addData = function(){
            $(".saveData").click(function(){
                var errorMsg = validate();
                if(!errorMsg){
                    var data = {
                        sex : $("input[name='sex']").val(),
                        age : $("input[name='age']").val(),
                        height : $("input[name='height']").val(),
                        weight : $("input[name='weight']").val(),
                        signature : $("textarea[name='signature']").val()
                    }
                    var returnData = util.getData('/saveData',"POST",data);
                    if(returnData.status.code == '200'){
                        window.location.href = "/usercenter";
                    }
                    else{
                        $(".errorMsg").html(returnData.status.message);
                    }
                }
                else{
                    $(".errorMsg").html(errorMsg);
                }
            })

        }();
        //展示上传图片
        var logo = function(){
            var displayImg = function(){
                var file = document.getElementById('choosePic');
                util.displayImg(file,$("#user-logo"),$("#head-logo"));
            }();
            $(".upload").click(function(){
                if($("#head-logo").val() != ""){
                    var uploadData = util.getData('/updateLogo','POST',{head : $("#head-logo").val()});
                    //成功后的执行函数
                }
            })
        }();
        //修改密码
        var updatePass = function(){
            $(".update").click(function(){
                var passData = util.getData('/vPass','POST',{nowpass:$(".nowPass").val()});
                if(passData.status.code == '200'){
                    if($(".newPass").val() != $(".cnewPass").val()){
                        $(".errorMsg").html("两次密码输入请一致。");
                        $(".errorMsg").removeClass('display-n');
                        return false;

                    }
                    else{
                        var newPassData = util.getData('/updatePass',"POST",$(".cnewPass$").val());
                        if(newPassData.status.code == "200"){
                            //修改成功
                        }
                        else{
                            //修改不成功

                        }

                    }
                }
                else{
                    $(".errorMsg").html("当前密码输入不正确。");
                    $(".errorMsg").removeClass('display-n');
                    return false;
                }
            })
        }();

    })
})