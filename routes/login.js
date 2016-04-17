var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get( '/',function(req, res, next) {
  res.locals.req = req;
  res.locals.res = res;
  
  res.render('login/index',{user: req.user});
});


router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/return', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
});


module.exports = router;
