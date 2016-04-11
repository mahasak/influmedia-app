var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('influencer/list');
});

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('influencer/register');
});

module.exports = router;
