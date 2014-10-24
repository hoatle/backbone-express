'use strict';

var uuid     = require('node-uuid');
var mongoose = require('mongoose');
var Shout = mongoose.model('Shout');

exports.home = function(req, res) {
  return res.render('pages/home');
};

exports.rand = function(req, res) {
  var token = uuid();
  console.log('token: ' + token);
  var shout = new Shout({
      name: 'Anon',
      shout: token
    });
  shout.save();
  Shout.find()
  .exec(function (err, shouts){
    if(err) {
      console.log(err);
    }
    return res.render('pages/rand', {token: token, shouts: shouts});
  });
  
};
