'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var User = Backbone.Model.extend({
  urlRoot: '/api/users'
});

var Users = Backbone.Collection.extend({
  url: '/api/users'
});

module.exports = {
    User: User,
    Users: Users
};