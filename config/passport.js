'use strict';

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = mongoose.model('User');

module.exports = function(passport) {

  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    return User.findOne({
      _id: id
    }, function(err, user) {
      return done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      console.log('email:' + email);
      console.log('password:' + password);
      if (!email || !password) {
        return done(null, false, {
          message: 'Invalid email or password.'
        });
      }
      return User.findOne({
        email: email
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'No accounts with that email address.'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    })
  );



  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK
    },
    function (accessToken, refreshToken, profile, done) {
      // do we have a facebook.id already in the database?
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          // check to see if there's a local user with the same email address
          User.findOne({
            'email': profile.emails[0].value
          }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              // Create user
              user = new User({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'facebook',
                facebook: profile._json,
                friends: profile.friends,
                avatar: profile.profilePicture
              });
              // user = new User();
              // user.fullName = profile.displayName;
            }else{
              // Update user
              user.provider = 'mix';
              user.facebook = profile._json;
              user.friends = profile.friends;
              user.avatar = profile.profilePicture;
            }
            user.save(function (err) {
              if (err) {
                console.log(err);
              }
              return done(err, user);
            });
          });
        }
        else {
          return done(err, user);
        }
      });
    }
  ));

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (!user) {
          // check to see if there's a local user with the same email address
          User.findOne({
            email: profile.emails[0].value
          }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              // Create new user
              user = new User({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'google',
                google: profile._json
              });
            }else{
              // Update user
              user.provider = 'mix';
              user.google = profile._json;
              user.avatar = profile.profilePicture;
            }
            user.save(function (err) {
              if (err) {
                console.log(err);
              }
              return done(err, user);
            });
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
