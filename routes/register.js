var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register/user');
});

/* GET users listing. */
router.get('/influencer', function(req, res, next) {
  res.render('register/influencer');
});

module.exports = router;
