'use strict';

var mongoose = require('mongoose');
var Shout = mongoose.model('Shout');


module.exports = function(app) {

  // List shouts
  app.get('/api/shouts', function(req, res) {
    Shout
    .find()
    .exec(function (err, shouts) {
      if(err) {
        console.log(err);
      }
      res.json(shouts);
    });

  });


  // Add shout
  app.post('/api/shouts', function(req, res) {

    console.log('post in api shouts: ' + req.body);

    var shout = new Shout(req.body);
    shout.save(function(err) {
      if (err) {
        console.error(err);
      }
      // res.json(shout, 201);
      res.status(201).json(shout);
    });
  });




};