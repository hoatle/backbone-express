'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

exports.faq = function() {
  var template = require('../templates/static/faq.html');
  $('#app').html(template({foo: 'bar'}));
};
