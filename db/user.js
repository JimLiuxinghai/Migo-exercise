var mongoose = require('./config');
var Schema1 = mongoose.Schema;
var userSchema = new Schema1({
	name : String,
	pass : String,
    userlogo : String,
    sex : String,
    age : Number,
    height : Number,
    wight : Number,
    BMI : String,
    signature : String,
	mytrain:[]
});
var User = mongoose.model('User', userSchema);
//倒出模型
module.exports = User;

