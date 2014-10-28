'use strict';

var mongoose = require('mongoose');

var ShoutSchema = mongoose.Schema({
  name: {type: String, 'default': 'Anon', trim: true},
  shout: {type: String, 'default': 'No message'},
  created: {type:Date, required:true, default:Date.now},
  numLikes: {type: Number, default: 0}
});

ShoutSchema.methods.upper = function() {
  return this.name.toUpperCase();
};

module.exports = mongoose.model('Shout', ShoutSchema);