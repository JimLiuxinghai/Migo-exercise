//连接数据库
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Migo');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功')
});
module.exports = mongoose;

