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
      User.findOne({ oauthID: profile.id ,provider: 'instagram' }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
            /*
            oauthID: Number,
            provider: String,
            username: String,
            fullname: String,
            firstname: String,
            lastname: String,
            profile_picture: String,
            descript: String,
            website: String,
            media: Number,
            followers: Number,
            followedBy: Number,
            created: Date
            */
          console.log('****************************************************');
          console.log(profile._json);
          console.log(profile.name);
          console.log('****************************************************');
          user = new User({
            oauthID: profile.id,
            provider: 'instagram',
            username: profile.username,
            fullname: profile.displayName,
            firstname: '',
            lastname: '',
            influencer: false,
            profile_picture: profile._json.data.profile_picture,
            descript: profile._json.data.bio,
            website: profile._json.data.website,
            media: profile._json.data.counts.media,
            followed_by: profile._json.data.counts.followed_by,
            follows: profile._json.data.counts.follows,
            fee: 0,
            category: 0,
            keywords: '',
            zipcode: '',
            email: '',
            confirmed_email: false,
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
    /*User.findOne({ oauthID: id ,provider: 'instagram' }, function(err, user){
      console.log(user);
        if(!err) done(null, user);
        else done(err, null);
      });*/
    User.findById(id, function(err, user){
      //console.log(user);
        if(!err) done(null, user);
        else done(err, null);
      });
  });

}
