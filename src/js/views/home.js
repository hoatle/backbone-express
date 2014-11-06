'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var Home = Backbone.View.extend({

    el: '#app',

    initialize: function () {
        this.render();
    },

    render: function () {
      $('#app').html('Welcome home Man.');
    }
});


module.exports = function() {
  new Home();
};
