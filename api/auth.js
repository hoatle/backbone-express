'use strict';

var passport = require('passport');

module.exports = function(app) {

  app.post('/api/auth/login', function (req, res, next) {

  req.session.foo = 'bar';
  res.cookie('cookieTest', '9989898', { maxAge: 900000, httpOnly: true });

  console.log('Sessions: ', req.session);
  console.log('Cookies: ', req.cookies);

   passport.authenticate('local', function(err, user) {
       if (err) return next(err);
       if (!user) {
           return res.json(403, {
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

  app.get('/api/auth/logout', function (req, res) {
    req.logout();
    return res.json({
        message: 'logged out',
    });
  });

};

