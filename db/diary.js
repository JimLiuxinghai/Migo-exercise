var mongoose = require('./config');
var Schema1 = mongoose.Schema;
var dSchema = new Schema1({
    diaryText  : String,
    diaryTitle : String,
    username  : String,
    time : Date,
    trendAssist : String,
    state : String,
    img : String

});
var Diary = mongoose.model('Diary', dSchema);
//倒出模型
module.exports = Diary;

