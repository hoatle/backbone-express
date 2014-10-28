'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

var Shouts = Backbone.Collection.extend({
  url: '/api/shouts'
});

var Shout = Backbone.Model.extend({
  urlRoot: '/api/shouts'
});

var ShoutIndexView = Backbone.View.extend({
    el: '#app',
    initialize: function () {
        this.render();
    },
    render: function () {
      var that = this;
      var shouts = new Shouts();
      shouts.fetch({
        success: function (shouts) {
          var template = require('../templates/shouts/index.html');
          that.$el.html(template({ shouts: shouts.models }));
          console.log(shouts.models);
        }
      });
    }
});

var ShoutEditView = Backbone.View.extend({
  el: '#app',
  // events: {'click #add': 'submitAdd'},
  events: {'submit': 'save'},
  initialize: function () {
      this.render();
  },
  render: function () {
    var template = require('../templates/shouts/new.html');
    this.$el.html(template());
  },
  save: function(e) {
    console.log(e);
    e.preventDefault();
    var data = $('#foo').serializeObject();
    console.log(data);
    var shout = new Shout();
    // var data = {shout: 'blue'};
    shout.save(data, {
        success: function (shout) {
            console.log(shout.toJSON());
        }
    });
    console.log('trying to save this shit');
  }
});

var ShoutShowView = Backbone.View.extend({
  el: '#app',
  initialize: function () {
      this.render();
  },
  render: function () {
    var shout = new Shout();
    var shoutDetails = {shout: 'hello'};
    // shout.save(data);

    shout.save(shoutDetails, {
        success: function (shout) {
            console.log(shout.toJSON());
        }
    });

    var template = require('../templates/shouts/new.html');
    this.$el.html(template());
  }
});

exports.index = function() {
  var shoutIndexView = new ShoutIndexView();
};

exports.new = function() {
  var shoutEditView = new ShoutEditView();
};

exports.show = function() {
  var shoutShowView = new ShoutShowView();
};



