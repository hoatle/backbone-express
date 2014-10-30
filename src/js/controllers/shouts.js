'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// ???
var router = require('../router');
// var router = new Router();

// Need to put this in /src/js/lib
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
  events: {'submit': 'save'},
  initialize: function () {
      this.render();
  },
  render: function () {
    var template = require('../templates/shouts/new.html');
    this.$el.html(template());
  },
  save: function(e) {
    e.preventDefault();
    var data = $('#foo').serializeObject();
    var shout = new Shout();
    shout.save(data, {
        success: function (shout) {
            console.log(shout.toJSON());
            console.dir(router);
            // not sure how to bring router constructor in with Browserify
            router.navigate('/shouts', {trigger: true});
        }
    });
  }
});

// var ShoutShowView = Backbone.View.extend({
//   el: '#app',
//   initialize: function () {
//       this.render();
//   },
//   render: function () {
//     var template = require('../templates/shouts/new.html');
//     this.$el.html(template());
//   }
// });

exports.index = function() {
  var shoutIndexView = new ShoutIndexView();
};

exports.new = function() {
  var shoutEditView = new ShoutEditView();
};

// exports.show = function() {
//   var shoutShowView = new ShoutShowView();
// };



