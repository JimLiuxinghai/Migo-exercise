//连接数据库
var mongoose = require("mongoose");
var config = require("config");
var dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig)
mongoose.connect(dbConfig);
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('连接成功')
});
module.exports = mongoose;

