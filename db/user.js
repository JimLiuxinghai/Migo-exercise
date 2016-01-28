//连接数据库
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Migo');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('连接成功')
});
exports.mongoDB = db;
var Schema1 = mongoose.Schema;
var userSchema = new Schema1({
	name : String,
	pass : String,
    userlogo : String,
	mytrain:[]
});
var User = mongoose.model('User', userSchema);
//倒出模型
module.exports = User

