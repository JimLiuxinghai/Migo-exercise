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
            "simditor" : "simditor/simditor",
            "module" : "simditor/module",
            "hotkeys" : "simditor/hotkeys",
            "uploader" : "simditor/uploader"
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
            "highcharts" : ['jquery']
        }
    }
)