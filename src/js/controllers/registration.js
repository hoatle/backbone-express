'use strict';

var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.join = function(req, res) {
  return res.render('registration/join',{
    user: new User()
  });
};

exports.create = function(req, res, next) {
  var newUser;
  newUser = new User(req.body);
  newUser.avatar = Math.floor(Math.random() * 18) + 1;
  //console.dir(newUser);
  User.findOne({email: newUser.email}).exec(function(err, user) {
    if (err) {
      next(err);
    }
    if (!user) {
      newUser.save(function(err) {
        if (err) {
          console.log(err.errors);
          //console.log(newUser);
          req.flash('errors', err.errors);
          req.flash('user', newUser);
          res.render('registration/join', {errors: err.errors,user: newUser});
          //return res.redirect('/join');
        }else{
          req.login(newUser, function(err) {
            if (err) {
              console.log(err);
              next(err);
            }
            req.flash('info', 'Welcome to the show');
            return res.redirect('/');
          });
        }
      });
    } else {
      console.log('USER BE THERE');
      return res.render('registration/join', {
        errors: [
          {
            'message': 'email already registered'
          }
        ],
        user: newUser
      });
    }
  });
};

exports.login = function(req, res) {
  return res.render('registration/login', {
    user: req.user
  });
};

exports.logout = function(req, res) {
  req.logout();
  return res.redirect('/login');
};



