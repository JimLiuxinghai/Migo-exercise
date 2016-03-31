var mongoose = require('./config');
var Schema1 = mongoose.Schema;
var dSchema = new Schema1({
    trend : String,
    username : String,
    trendAssist : String,
    time : Date

});
var Dynamic = mongoose.model('Dynamic', dSchema);
//倒出模型
module.exports = Dynamic;

