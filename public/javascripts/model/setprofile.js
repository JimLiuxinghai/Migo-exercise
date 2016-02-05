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
        }();
        //清除错误信息
        var clearErr = function(){
            $("input").focus(function(){
                $(".errorMsg").html("");
            })
        }();
        //验证表单
        function validate(){
            debugger;
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
                        sex : $("input[name='age']").val(),
                        age : $("input[name='age']").val(),
                        height : $("input[name='height']").val(),
                        weight : $("input[name='weight']").val(),
                        signature : $("input[name='signature']").val()
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
    })
})