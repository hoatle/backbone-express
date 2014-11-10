'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var template = require('../templates/join.html');
var models = require('../models/user.js');

require('../lib/serialize-object.js')();

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
    var data = $('#join-form').serializeObject();
    var user = new models.User();
    user.save(data, {
      success: function (obj) {
        var errorMsg = obj.get('error');
        if (errorMsg) {
          console.log(errorMsg);
          $('#msg').html(errorMsg);
        }else{
          window.router.navigate('', {trigger: true});
        }
      }
    });
    return false;
  }
});

module.exports = function() {
  new Join();
};
