'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('../templates/shouts/index.html');

var Shouts = Backbone.Collection.extend({
  url: '/api/shouts'
});

module.exports = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.render();
    },
    render: function () {
      var that = this;
      var shouts = new Shouts();
      shouts.fetch({
        success: function (shouts) {
          that.$el.html(template({ shouts: shouts.models }));
          console.log(shouts.models);
        }
      });
    }
});