var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var config = require('../oauth.js');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('influencer/list');
});*/
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.locals.req = req;
  res.locals.res = res;
  
  User.find({},{},function(err,influencer) {
    res.render('influencer/list', {
        user: req.user,
        influencer: influencer
    });
  });  
});


router.get('/detail/:userid', function(req, res) {
  res.locals.req = req;
  res.locals.res = res;
  var userID = req.params.userid;
  
  
         
  
  
  User.find({_id: userID},{},function(err,doc) {
    
    console.log(config);
    console.log(doc[0].oauthID);
    
    var Instagram = require('instagram-node-lib');

    Instagram.set('client_id', config.instagram.clientID);
    Instagram.set('client_secret', config.instagram.clientSecret);
    Instagram.set('access_token', doc[0].accessToken);
    var data;
    
    data=Instagram.users.recent({ 
				user_id: doc[0].oauthID,
				count: 5,
			 	complete: function(data, pagination) {
                    //console.log('************************************************');
					console.log( data );	
                    
                    res.render('influencer/detail', {
                        user: req.user,
                        doc: doc,
                        recentImage: data
                    });
				}
			});
    
  });  
});

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.locals.req = req;
  res.locals.res = res;
  
  res.render('influencer/register',{
      user: req.user
  });
});

module.exports = router;
