/**
 * Created by jimliu on 2016/1/21.
 */
//require配置
require.config(
    {
        path:{
            "jquery" :"jquery.js",
            "util" : "util",
            "domReady" : 'domReady',
            "jquery.cookie" : "jquery.cookie.js",
            "highcharts" : "highcharts"
        },
        shim : {
            "jquery": {
                exports: "jquery"
            },
            "util" : {
                deps : ['jquery'],
                exports :"util"
            },
            "jquery.cookie" : {
                deps : ['jquery'],
                init: function (jquery) {
                    exports :"cookie"
                }

            },
            'highcharts': {
                exports: "Highcharts",
                deps: ["jquery"]
            },
            'simditor' : ['jquery']
        }
    }
)
