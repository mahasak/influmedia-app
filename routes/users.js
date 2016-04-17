var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    
  res.send('respond with a resource',{
      user: req.user
  });
});

module.exports = router;
