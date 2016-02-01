var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Migo');
module.exports.mongoose = mongoose;

