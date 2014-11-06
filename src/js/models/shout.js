'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Shout = Backbone.Model.extend({
  urlRoot: '/api/shouts',
  defaults: {
    name: 'Anon',
    msg: 'No msg'
  }
});

var Shouts = Backbone.Collection.extend({
  url: '/api/shouts'
});

module.exports = {
    Shout: Shout,
    Shouts: Shouts
};