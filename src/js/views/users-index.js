'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var models = require('../models/user.js');
var template = require('../templates/users-index.html');

var UserList = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.render();
    },
    render: function () {
      var that = this;
      var users = new models.Users();
      users.fetch({
        success: function (users) {
          that.$el.html(template({ users: users.models }));
        }
      });
    },
});

module.exports = function() {
  new UserList();
};
