'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var models = require('../models/user.js');
var template = require('../templates/profile.html');

var Profile = Backbone.View.extend({
    el: '#app',
    initialize: function (options) {
        this.render(options);
    },
    render: function (options) {
      var that = this;
      var users = new models.User({id: options.id});
      users.fetch({
        success: function (data) {
          that.$el.html(template({ user: data }));
        }
      });
    },
});

module.exports = function(id) {
  new Profile({id: id});
};