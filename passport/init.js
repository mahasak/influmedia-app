var config = require('../oauth.js');
var User = require('../models/user.js');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
//var fbAuth = require('./authentication.js');
//var TwitterStrategy = require('passport-twitter').Strategy;
//var GithubStrategy = require('passport-github2').Strategy;
//var GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function(passport){

  passport.use(new InstagramStrategy({
    clientID: config.instagram.clientID,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now()
          });
          user.save(function(err) {
            if(err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        }
      });
    }
  ));


  // serialize and deserialize
  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      console.log(user);
        if(!err) done(null, user);
        else done(err, null);
      });
  });

}
