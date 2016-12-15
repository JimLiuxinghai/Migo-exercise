/**
 * Created by jim on 2016/1/23.
 */
require(['jquery','util','domReady','jquery.cookie'],function($,util,domReady){
    domReady(function(){
        //清除错误信息
        var clearErr = function(){
            $("input").focus(function(){
                $(".errorMsg").html("");
            })
        }();
        //展示图片
        var displayImg = function(){
            var file = document.getElementById('head-logo');
            util.displayImg(file,$("label"),$("#img-src"));
        }();
        //表单验证
        var validate = function(){
            var errorMsg;
            if($("input").val()==""){
                return errorMsg = "请将注册信息填写完整。"
            }
            else if($("input[name='password']").val() !=$("input[name='passwordAgain']").val()){
                return errorMsg = "请保证两次密码输入一致。"
            }

        }
        //注册
        var register = function(){
            $(".register").click(function(){
                var errorMsg = validate();
                if(!errorMsg){
                    //console.log($("#img-src").val().replace(/^data:image\/\w+;base64,/, ""))
                    //注册信息
                    var regData = {
                        username : $("input[name='username']").val(),
                        password : $("input[name='password']").val(),
                        userlogo : 'jim.png'
                    };
                    var data = util.getData('/reg',"POST",regData);
                    if(data = "success"){
                        window.location.href = 'login';
                    }
                    else{
                        $(".errorMsg").html(data);
                    }

                }
                else{
                    $(".errorMsg").html(errorMsg);
                }
            })
        }()
    })
})
