var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Campaign = require('../models/campaign.js');
var config = require('../oauth.js');

/* GET users listing. */
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.locals.req = req;
  res.locals.res = res;
  
  User.find({},{},function(err,influencer) {
    res.render('account/my', {
        user: req.user,
        influencer: influencer
    });
  });  
});



module.exports = router;
