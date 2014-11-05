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
    var shout = new Shout(req.body);
    shout.save(function(err) {
      if (err) {
        console.error(err);
      }
      res.status(201).json(shout);
    });
  });


  // update
  app.put('/api/shouts/:id', function(req, res) {
    Shout.findByIdAndUpdate(req.params.id,
    { $set: req.body },  
    function(err) {
      if(err) {
        console.log(err);
      }
      res.json(200);
    });
  });
  

  // delete
  app.delete('/api/shouts/:id', function(req, res) {
    Shout.remove({_id: req.params.id}).exec(function (err){
      if(err) {
        console.log(err);
      }
      res.json(200);
    });
  });

};