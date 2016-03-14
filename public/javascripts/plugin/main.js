/**
 * Created by jimliu on 2016/1/21.
 */
//require配置
require.config(
    {
        path:{
            "jquery" :"jquery.js",
            "util" : "util",
            "cookie" : "cookie.js",
            "domReady" : 'domReady',
            "highcharts" : "highcharts",
            "simditor" : "simditor",
            "module" : "module",
            "hotkeys" : "hotkeys",
            "uploader" : "uploader"
        },
        shim : {
            "jquery": {
                exports: "jquery"
            },
            "util" : {
                deps : ['jquery'],
                exports :"util"
            },
            "cookie" : {
                deps : ['jquery'],
                exports :"cookie"
            },
            'highcharts': {
                exports: "Highcharts",
                deps: ["jquery"]
            },
            'simditor' : ['jquery']
        }
    }
)