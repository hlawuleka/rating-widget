var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  email: {
  	type: String,
  	unique: true,
  	required:true,
  	dropDups: true
  },
  message: {
  	type:String,
  	required:true
  },
  rating: {
  	type: Number,
  	required:true
  },
  RatingRead:Number,
  id: Number

});

module.exports = mongoose.model('Rating', RatingSchema);