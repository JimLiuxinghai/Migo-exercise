var mongoose = require('./config');
var Schema1 = mongoose.Schema;
var userSchema = new Schema1({
	name : String,
	pass : String,
    userlogo : String,
    sex : String,
    age : String,
    height : String,
    weight : String,
    BMI : String,
    regTime : Date,
    calorie : [
        {
            time : String,
            calorie : Number
        }
    ],
    yesCalorie : Number,
    signature : String,
	mytrain:[{name: String}]
});
var User = mongoose.model('User', userSchema);
//倒出模型
module.exports = User;

