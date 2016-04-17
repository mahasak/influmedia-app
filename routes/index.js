var express = require('express');
var router = express.Router();

/* GET home page. */
router.get( '/',function(req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    
    res.render('landingPage/index',{
        is_login: req.isAuthenticated
    });
});
      
  


module.exports = router;
