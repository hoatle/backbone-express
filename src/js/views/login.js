'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('../templates/auth/login.html');

var Login = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.render();
    },
    render: function () {
      this.$el.html(template());
    }
});

module.exports = function() {
  new Login();
};
