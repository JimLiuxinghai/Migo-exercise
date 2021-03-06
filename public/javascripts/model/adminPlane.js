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
            $("."+data).show();
        })
        //删除健身计划
        $('.delete').click(function(){
            var id = $(this).find('input[type="hidden"]').val();
            $.ajax({
                url : '/admin/deletePlane',
                type : 'POST',
                data : {id : id},
                success : function (msg) {
                    if(msg.status.code == '200'){
                        setTimeout(window.location.href='/admin/plane',2000);
                    }
                }
            })
        })
        //保存训练名称等
        $(".con-add").click(function () {
            var calorie = parseInt($('input[name="trainCalorie"]').val());
            var num = /^[1-9]d*|0$/;
            var isNum = num.test(calorie);
            if(isNum) {
                var planeData = $('form[name="plane"]').serializeObject();
                $.ajax({
                    url : '/admin/addplane',
                    type : 'POST',
                    data : planeData,
                    success : function (msg) {
                        if(msg.status.code == '200'){
                            $("#planeId").val($('input[name="trainName"]').val());
                            $(".plane").hide();
                            $(".add-pic").fadeIn();
                        }

                    }
                })
            }
            else {
                alert("训练热量请输入正整数")
                $('input[name="trainCalorie"]').val("");
                $('input[name="trainCalorie"]').focus();
                return false;
            }

        })
        var i = 1;
        //添加图片
        var addConPic = function () {
            $(".addpic").click(function(){
                var picdom = '<div class="row">'+
                    '<div class="col6 offset3">'+
                    '<input type="file" accept="image/*" id="plane'+i+'" name="plane'+i+'" />'+
                    '<input type="hidden" name="plane'+i+'">'+
                    '</div>'+
                    '<div class="col12">'+
                    '<input class="form-control" type="text" placeholder="图片描述" name="plane'+i+'" />'+
                    '</div>'+
                    '<div class="col2">'+
                    '<input type="button" value="上传" name="plane'+i +'" class="btn btn-info ml20">'+
                    '</div>'+
                    '</div>';
                $(".onepic").append(picdom);
                i = i + 1;
            });

            //上传图片 使用事件代理为btn绑定事件
            $(".onepic").delegate('.btn','click',function(){
                var id = $("#planeId").val();
                var name = $(this).attr('name');
                var file = document.getElementById(name).files[0];
                var desc = $('input[type="text"][name="'+name+'"]').val();
                readAsDataURL(file,$('input[type="hidden"][name="'+name+'"]'));
                //解决读取图片异步的问题
                setTimeout(function(){
                    var pic = $('input[type="hidden"][name="'+name+'"]').val();
                    $.ajax({
                        url : '/admin/addPlanePic',
                        type : 'POST',
                        data : {
                            id : id,
                            name : name,
                            picDes : desc,
                            pichref : pic
                        },
                        success : function (msg) {
                            alert("上传成功")
                        }
                    })
                },100)
            })
        }();
        //读取图片
        function readAsDataURL(file,hidden)
        {
            //检查是否为图像文件
            if(!/image\/\w+/.test(file.type))
            {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            //将文件以Data URL形式进行读入页面
            reader.readAsDataURL(file);
            reader.onload = function(e)
            {
                hidden.val(this.result.replace(/^data:image\/\w+;base64,/, ""));
            }

        }
        //序列化对象
        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    });
})
