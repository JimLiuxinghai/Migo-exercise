/**
 * Created by jimliu on 2016/1/22.
 */
require(['jquery','util','domReady','highcharts'],function($,util,domReady,highcharts){
    domReady(function(){
        //highcharts配置文件
        var highOption = {
            chart: {
                type: 'column'
            },
            title: {
                text: '我的健身报表'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: false
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
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }]
        }
        //图表展示
        var chart = function(){
            $('.kChart').highcharts(highOption);
        }();
        //图片轮播
        var carousel = function(){
            var index = 1;
            $(".prev").click(function(){
                index += 1;
                if(index > 3){
                    index = 1;
                }
                $(".carousel").fadeIn('slow').attr("src",'images/index'+index+'.fw.png').fadeIn();
            });
            $(".next").click(function(){
                index -= 1;
                if(index < 1){
                    index = 3;
                }
                $(".carousel").fadeIn('slow').attr("src",'images/index'+index+'.fw.png').fadeIn();
            });
            setInterval(function(){
                index += 1;
                if(index > 3){
                    index = 1;
                }
                $(".carousel").fadeIn('slow').attr("src",'images/index'+index+'.fw.png');
            },3000);

        }();
    })

})