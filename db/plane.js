var mongoose = require('./config');
var Schema1 = mongoose.Schema;
var planeSchema = new Schema1({
    trainName  : String,
    trainTime  : String,
    trainText  : String,
    trainEq : String, //训练器材
    trainPosition  : String,
    trainCalorie   : String,
    trainLevel    : String, //训练难度
    trainUser    : [],
    trainPic : []
});
var Plane = mongoose.model('Plane', planeSchema);
//倒出模型
module.exports = Plane;

