var mongoose = require('mongoose');

// create a user model
var Token = mongoose.model('Token', {
  oauthID: Number,
  name: String,
  created: Date
});

module.exports = Token;
