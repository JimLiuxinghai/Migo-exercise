//连接数据库
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Migo');
//mongoose.connect('mongodb://jimliu:123456@ds051625.mlab.com:51625/migo');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功')
});
module.exports = mongoose;

