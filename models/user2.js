
var mongoose = require('mongoose');

var User2 = mongoose.model('User2', {
  ID: Number,
  oauthProvider: String,
  oauthID: Number
  username: String,
  fullName: String,
  created: Date
});

module.exports = User2;
