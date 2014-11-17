'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

  app.post('/api/auth/login', function (req, res, next) {

    req.session.foo = 'bar';
    res.cookie('cookieTest', '9989898', { maxAge: 900000, httpOnly: true });

    console.log('Sessions: ', req.session);
    console.log('Cookies: ', req.cookies);

     passport.authenticate('local', function(err, user) {
         console.log(err);
         if (err) return next(err);
         if (!user) {
             return res.status(403).json({
                 message: 'no user found'
             });
         }
         console.log(user);
         req.login(user, function(err) {
             if (err) return next(err);
             // i don't think i need the code below
             // i think passport automatically sets a cookie
             // res.cookie('user', user, {maxAge: 900000});
             return res.json({
                 message: 'user authenticated',
             });
         });

     })(req, res, next);
  });

  app.get('/api/auth/user', function (req, res) {
    if(req.user) {
      User.findOne({ _id: req.user.id })
      .exec(function(err, user) {
        if (err) {
          return res.json({ message: 'err' });
        }
        if (!user) {
          return res.json({ message: 'no user' });
        }
        return res.json(user);
      });
    }else{
      return res.json({ message: 'not logged in' });
    }
  });

  app.get('/api/auth/logout', function (req, res) {
    req.logout();
    return res.json({ message: 'logged out' });
  });

};

