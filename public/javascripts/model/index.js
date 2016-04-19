/**
 * Created by jimliu on 2016/1/22.
 */
require(['jquery','highcharts','util','swiper','domReady'],function($,highcharts,util,swiper,domReady){
    domReady(function(){
        $(function(){
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
            //图片轮播
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                loop: true
            });
        })
    })

})