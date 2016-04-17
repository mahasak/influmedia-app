
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.req = req;
    res.locals.res = res;
  
  res.render('register/user',{
      user: req.user
  });
});


router.get('/influencer', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.locals.req = req;
  res.locals.res = res;
  
  res.render('register/influencer',{
      user: req.user
  });
});

/*
router.get('/influencer', function(req, res, next) {
  res.locals.req = req;
    res.locals.res = res;
    
  res.render('register/influencer',{
      user: req.user
  });
});
*/

/* POST users listing. */
router.post('/influencer', function(req, res, next) {
  res.locals.req = req;
  res.locals.res = res;
  var responseJson = { };
  //responseJson.success=false;
  responseJson.success = true;
  User.findOne({ oauthID: req.user.oauthID ,provider: 'instagram' }, function(err, user) {
        if(err) {
          responseJson.success = false;
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          user.fee = req.body.fee;
          user.category = req.body.category;
          user.keywords = req.body.keywords;
          user.zipcode = req.body.zip;
          user.descript = req.body.bio;
          user.email = req.body.email;
          user.influencer = true;
          
          user.save(function(err) {
            if(err) {
              responseJson.success = false;
              console.log(err);  // handle errors!
            } else {
              responseJson.success = true;
              console.log("saving user ...");
              //done(null, user);
            }
          });
        }
  });  
  
  //console.log(req.user);
  
  //console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(responseJson));
  /*
  res.render('register/influencer',{
      user: req.user
  });
  */
});

module.exports = router;
