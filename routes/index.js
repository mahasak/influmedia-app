var express = require('express');
var router = express.Router();

/* GET home page. */
router.get( '/',function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('layout');
});

/*
exports.index = function(req, res){
  res.render('layout');
};
*/


module.exports = router;
