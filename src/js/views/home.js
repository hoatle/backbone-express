'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('../templates/home.html');

var Home = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.render();
    },
    render: function () {
      this.$el.html(template());
    }
});

module.exports = function() {
  new Home();
};
