
var mongoose = require('mongoose');

var Campaign = mongoose.model('Campaign', {
  influencer_id: Number,
  merchant_id: Number,
  no_of_post: Number,
  fee: Number,
  total: Number,
  category: Number,
  zipcode: String,
  about_campaign: String,
  negotiate_count: Number,
  due_date: Date,
  create_date: Date,
  agreed: Boolean
});

module.exports = Campaign;
