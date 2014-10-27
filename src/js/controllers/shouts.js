'use strict';

var $ = require('jquery');

exports.index = function() {
  $('#app').html('list shouts<br><a href=\'#shouts/new\'>new shout</a>');
};

exports.new = function() {
  $('#app').html('new form for shout');
};

exports.create = function() {
  $('#app').html('add shout to db and redirect to list');
};