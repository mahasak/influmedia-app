
var mongoose = require('mongoose');

var User = mongoose.model('User', {
  oauthID: Number,
  provider: String,
  username: String,
  fullname: String,
  firstname: String,
  lastname: String,
  influencer: Boolean,
  profile_picture: String,
  descript: String,
  website: String,
  media: Number,
  followed_by: Number,
  follows: Number,
  fee: Number,
  category: Number,
  keywords: String,
  zipcode: String,
  email: String,
  confirmed_email: Boolean,
  created: Date
});

module.exports = User;
