'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

module.exports = function() {
  console.log('We are inside test.js');
  console.log('But are we?');
  $('#haters').fadeOut();
};