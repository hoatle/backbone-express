'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var validator = require('validator');

module.exports = function(app) {

  // index
  app.get('/api/users', function(req, res) {
    User
    .find()
    .exec(function (err, users) {
      if(err) {
        console.log(err);
      }
      res.json(users);
    });

  });

  // show
  app.get('/api/users/:id', function(req, res) {
    User
    .findById(req.params.id, function (err, user) {
      if(err) {
        console.log(err);
      }
      res.json(user);
    });

  });

  // create
  app.post('/api/users', function(req, res) {
      var newUser;
      newUser = new User(req.body);
      newUser.avatar = Math.floor(Math.random() * 18) + 1;


      User.findOne({email: newUser.email}).exec(function(err, user) {
        if (err) {
          console.log(err);
        }
        if (!user) {

          newUser.save(function(err) {
            if (err) {
              console.log(err.errors);
              res.json({ error: 'Invalid username or password.' }); 
              // res.json(err.errors); 
              // res.status(401).json(err.errors);
            }else{
              req.login(newUser, function(err) {
                if (err) {
                  console.log(err);
                }
                res.json(user);
              });
            }
          });
        } else {
          res.json({ error: 'Email already registered.' }); 
        }
      });
    });

};

