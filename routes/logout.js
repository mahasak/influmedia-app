var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get( '/',function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
