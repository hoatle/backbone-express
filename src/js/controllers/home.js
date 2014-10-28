'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var Shouts = Backbone.Collection.extend({
  url: 'http://localhost:3000/shouts'
});

exports.home = Backbone.View.extend({

    el: '#app',

    initialize: function () {
        this.render();
    },

    render: function () {
      // var that = this;
      // var shouts = new Shouts();

      // shouts.fetch({
      //   success: function (shouts) {
      //     var template = require('../templates/shouts/index.html');
      //     that.$el.html(template({ shouts: shouts.models }));
      //     console.log(shouts.models);
      //   }
      // });
      $('#app').html('hello');
    }
});


exports.home2 = function() {
  $('#app').html('we in the home 2 controller.');
};


