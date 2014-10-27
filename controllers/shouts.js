'use strict';

var mongoose = require('mongoose');
var Shout = mongoose.model('Shout');

exports.index = function (req, res) {

  Shout
  .find()
  .exec(function (err, shouts) {
    if(err) {
      console.log(err);
    }
    res.json(shouts);
  });

};