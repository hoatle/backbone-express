'use strict';

var mongoose = require('mongoose');
var Shout = mongoose.model('Shout');


module.exports = function(app) {

  // index
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

  // show
  app.get('/api/shouts/:id', function(req, res) {
    Shout
    .findById(req.params.id, function (err, shout) {
      if(err) {
        console.log(err);
      }
      res.json(shout);
    });

  });

  // create
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

  // Question.update({ _id: req.params.id }, req.body, callback);

  // update
  app.put('/api/shouts/:id', function(req) {
    function callback (err) {
      if(err){
        console.log(err);
      }
    }
    Shout.update({ _id: req.params.id }, req.body, callback);

  });



};