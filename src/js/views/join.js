'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('../templates/auth/join.html');
var models = require('../models/user.js');

var Join = Backbone.View.extend({
    el: '#app',
    events: {
      'submit': 'save'
    },
    initialize: function () {
        this.render();
    },
    render: function () {
      this.$el.html(template());
    },
    save: function() {
      var data = $('#foo').serializeObject();
      var user = new models.User();
      user.save(data, {
          success: function () {
            window.router.navigate('', {trigger: true});
          }
      });
      return false;
    }
});

module.exports = function() {
  new Join();
};
