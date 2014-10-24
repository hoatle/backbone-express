'use strict';

var mongoose = require('mongoose');

var ShoutSchema = mongoose.Schema({
  name: {
    type: String,
    'default': '',
    trim: true
  },
  shout: {type: String, 'default': ''}
});

ShoutSchema.methods.upper = function() {
  return this.name.toUpperCase();
};

module.exports = mongoose.model('Shout', ShoutSchema);