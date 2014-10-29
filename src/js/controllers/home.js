'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


exports.home = Backbone.View.extend({

    el: '#app',

    initialize: function () {
        this.render();
    },

    render: function () {
      $('#app').html('Welcome home.');
    }
});


exports.home2 = function() {
  $('#app').html('we in the home 2 controller.');
};


