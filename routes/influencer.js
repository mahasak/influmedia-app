var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('influencer/list');
});*/
router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.locals.req = req;
  res.locals.res = res;
  
  res.render('influencer/list', {
      user: req.user
  });
  }
);

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.locals.req = req;
  res.locals.res = res;
  
  res.render('influencer/register',{
      user: req.user
  });
});

module.exports = router;
