'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Auth = Backbone.Model.extend({
  defaults: {
      Username: '',
      Password: '',
      RememberMe: false,
      LoginFailed: false,
      LoginAccepted: false
  },
  urlRoot: '/api/auth'
});

module.exports = {
    Auth: Auth
};