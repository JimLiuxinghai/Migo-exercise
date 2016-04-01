var  util =
{
	//异步加载js
   initJs : function(url,callback) {
        $.ajax({
            dataType:'script',
            scriptCharset:'gb2312',
            url:url,
            success:function(mjs){
                if (callback) callback(mjs);
            }
        });
    },

	//异步加载html
    initTmpl : function(url, callback) {
        $.ajax({
            url: url,
            async: true,
            cache: true,
            complete: function(xhr, textStatus) {},
            success: function(tmpl) {
                if (callback) callback(tmpl);
            },
            error: function(xhr, textStatus, errorThrown) {}
        });
    },
    //表单上传显示
    displayImg : function(file,result,hidden){
        if(typeof FileReader==='undefined'){
            input.setAttribute('disabled','disabled');
        }else{
            file.addEventListener('change',readFile,false);
        }
        function readFile(){
            var file = this.files[0];
            if(!/image\/\w+/.test(file.type)){
                alert("文件必须为图片！");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                hidden.val(this.result.replace(/^data:image\/\w+;base64,/, ""));
                result.find("img").attr("src",this.result);
            }
        }
    },
    //检测浏览器
    checkBrowser : function(){
        var Sys = {};
        var ua = window.navigator.userAgent.toLowerCase();
        var userAgent=window.navigator.userAgent.toLowerCase();
        if (window.ActiveXObject) {
            Sys.ie = ua.match(/msie ([\d.]+)/)[1];
        }

        else if (window.opera) {
            Sys.opera = ua.match(/opera.([\d.]+)/)[1]
        }

        else if(userAgent.indexOf("firefox")>=1){
            Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
        }

        else if (window.MessageEvent && !(userAgent.indexOf("firefox")>=1)) {
            Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
        }
        else if (window.openDatabase) {
            Sys.safari = ua.match(/version\/([\d.]+)/)[1]
        }
        return Sys;
    },
    //getUrl传参,获取url里面？后面的参数
    getUrlParam : function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
        {
            return unescape(r[2]);
        }
        else
        {
            return null;
        }
    },
    getData : function(url,type,data){

        var resdata;
        $.ajax({
            url : url,
            type : type,
            async: false,
            dataType : "JSON",
            data : data,
            success : function(msg){
                resdata = msg;
            },
            error : function(){
                var errorData = "请检查您的网络连接。"
                return errorData;
            }

        })
        return resdata;
    },
    getScreen : function(container,height){
        var scHeight = $(window).height();
        var minHeight = scHeight - height + 'px';
        container.css("min-height",minHeight);
    }
}
