/**
 * Created by jim on 2016/2/2.
 */
/**
 * Created by jimliu on 2016/1/22.
 */
require(['jquery','highcharts','util','domReady'],function($,highcharts,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".artical"));
            //左侧导航
            $(".left-nav").find('li').click(function(){
                var data = $(this).attr("data");
                $(".col18").fadeOut();
                $("."+data).fadeIn();
            });
            //日记点击
            $(".list-container").click(function(){
                debugger;
                $(".diary-list").hide();
                $(".diary-container").fadeIn();
                var _self = this;
                getDiary(_self);


            });
            $(".back").click(function(){
                $(".diary-container").fadeOut();
                $(".diary-list").slideDown();

            })
        }();

    })
    //渲染图表
    var complateCharts = function(data){
        //highcharts配置文件
        var highOption = {
            chart: {
                type: 'column'
            },
            title: {
                text: '我的健身报表'
            },
            xAxis: {
                categories: data.x
            },
            yAxis: {
                min: 0,
                title: {
                    text: '卡路里（千焦）'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 千焦</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [data.series]
        }
        //图表展示
        console.log(highOption);
        $('.kChart').highcharts(highOption);


    };

    //加载页面表格
    var initChart = function(){
        //页面初次加载
        var dayInit = function(){
            var type = {type : "day"};
            var dayData = util.getData('/chart','POST',type);
            complateCharts(dayData.data);
        }();
        //点击切换时间
        $(".time").click(function(){
            var type = {type : $(this).attr('name')};
            var dayData = util.getData('/chart','POST',type);
            complateCharts(dayData.data);

        })
    }();
    //进入日记详情
    function getDiary(dom){
        debugger;
        $(".diaryTitle").html($(dom).find('input[name="diaryTitle"]').val());
        $(".diaryTime").html($(dom).find('input[name="diaryTime"]').val());
        $(".diaryText").html($(dom).find('input[name="diaryText"]').val());

    }

    //日记删除
    $(".deletDiary").click(function(e){
        e.stopPropagation();
        var id = $(this).find('input').val();
        $.ajax({
            url : '/deletDiary',
            type : 'POST',
            data : {diaryId : id},
            success : function(msg){
                if(msg.status.code == '200'){
                    $(".mask").fadeIn();
                    setTimeout(window.location.href='/usercenter',2000);
                }
            }
        })
    })
    //动态删除
    $('.deletDynamic').click(function(){
        var dID = $(this).find('input').val();
        $.ajax({
            url : 'deletDynamic',
            type : "POST",
            data : {dID : dID},
            success : function(msg){
                if(msg.status.code == '200'){
                    $(".mask").fadeIn();
                    setTimeout(window.location.href='/usercenter',2000);
                }
            }

        })
    })
})



