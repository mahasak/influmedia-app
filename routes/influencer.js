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


/* GET users listing. */
router.post('/request', function(req, res, next) {
  res.locals.req = req;
  res.locals.res = res;
  
  console.log(req.body);
  //console.log(res);
  
  var total = (req.body.noOfPost * req.body.fee) + req.body.service_fee;
  
  campaign = new Campaign({
            influencer_id: req.body.influencer_id,
            merchant_id: req.body.merchant_id,
            no_of_post: req.body.noOfPost,
            fee: req.body.fee,
            total: total,
            category: req.body.category,
            zipcode: req.body.zip,
            about_campaign: req.body.about,
            negotiate_count: 0,
            due_date: Date.now(),
            create_date: Date.now(),
            agreed: false
          });
  console.log(campaign);
  campaign.save(function(err) {
    if(err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: false }));
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true }));
    }
  });
  /*
  res.render('influencer/request',{
      user_req: req
  });
  */
});

module.exports = router;
