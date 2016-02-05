/**
 * Created by jimliu on 2016/1/22.
 */
require(['jquery','util','domReady','cookie'],function($,util,domReady){
    domReady(function(){
        $("input").focus(function(){
            $(".errorMsg").html("");
        })
        //是否刚刚注册
        var hasReg = function(){
            if($.cookie("user")){
                $('input[name="username"]').val($.cookie("user"));
                $.cookie('user',{ expires: -1})
            }
        }();
        //表单验证
        var validate = function(){
            var errorMsg;
            if($('input').val() == ""){
                return errorMsg = "请将登录信息填写完整。";
            }
        };

        $(".login").click(function(){
            var userinfo = {
                username : $('input[name="username"]').val(),
                password : $('input[name="pass"]').val()

            }
            var errorMsg = validate();
            if(!errorMsg){

                $.ajax({
                    url : 'login',
                    type : "POST",
                    data : userinfo,
                    success : function(data){
                        console.log(data);
                        if(data == 'success'){
                            $.cookie('username',userinfo.username);
                            window.location.href = '/';
                        }
                        else{
                            $(".errorMsg").html(data);
                        }
                    }
                })
            }
            else{
                $(".errorMsg").html(errorMsg);
            }

        });
        //enter键登录
        $('input[name="pass"]').keypress(function(event){
            if(event.which == 13 ){
                $(".login").trigger('click');
            }
        })
    })

})