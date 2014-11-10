'use strict';

var passport = require('passport');

module.exports = function(app) {

 app.post('/login', function (req, res, next) {

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
             return res.json({
                 message: 'user authenticated',
             });
         });

     })(req, res, next);
 });

};

