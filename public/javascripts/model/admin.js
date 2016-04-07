/**
 * Created by jimliu on 2016/3/19.
 */
require(['jquery','highcharts','util','domReady'],function($,highcharts,util,domReady){
    domReady(function(){
        //页面初始化
        var ready = function(){
            //获取屏幕高度
            util.getScreen($(".left"),80);
        }();
        //导航颜色
        $('.admin-nav').find('li:eq(0)').find('a').css('color','#4DB3A2');
        //获取表格数据
        var pieData = util.getData('/admin/getPie', 'POST', '');
        console.log(pieData);
        //complateCharts($(".people"),pieData.data)
    });
    //渲染图表
    function complateCharts(dom,data){
        //highcharts配置文件
        var highOption = {
            chart: {
                type: 'pie'
            },
            title: {
                text: data.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [data.series]
        }
        //图表展示
        dom.highcharts(highOption);
    };
})
