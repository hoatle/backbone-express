'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

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

var Index = Backbone.View.extend({
    el: '#app',
    events: {
      'click .like': 'like',
      'click .show-reply': 'toggleReply'
    },
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
          $('.shout-reply').hide();
        }
      });
    },
    like: function (e) {
      var id = $(e.currentTarget).data('like');
      window.alert('we made it here:' + id);
      return false;
    },
    toggleReply: function (e) {
      var id = $(e.currentTarget).data('reply-link');
      // window.alert('we made it here:' + id);
      $('[data-reply-form="' + id + '"]').toggle();
      return false;
    }
});

var Edit = Backbone.View.extend({
  el: '#app',
  events: {
    'submit': 'save',
    'click .delete': 'delete'
  },
  initialize: function (options) {
      this.render(options);
  },
  render: function (options) {
    var that = this;
    if(options.id) {
      that.shout = new Shout({id: options.id});
      that.shout.fetch({
        success: function (shout) {
          var template = require('../templates/shouts/edit.html');
          that.$el.html(template({shout: shout}));
        }
      });

    }else{
      var template = require('../templates/shouts/edit.html');
      this.$el.html(template({shout: null}));
    }
  },
  save: function(e) {
    e.preventDefault();
    var data = $('#foo').serializeObject();
    var shout = new Shout();
    shout.save(data, {
        success: function () {
          router.navigate('/shouts', {trigger: true});
        }
    });
  },
  delete: function() {
    this.shout.destroy({
      success: function () {
        router.navigate('/shouts', {trigger: true});
      }
    });
    return false;
  }
});

var Show = Backbone.View.extend({
  el: '#app',
  initialize: function (options) {
      this.render(options);
  },
  render: function (options) {
    var that = this;
    var shout = new Shout({id: options.id});
    shout.fetch({
      success: function (data) {
        var template = require('../templates/shouts/show.html');
        that.$el.html(template({shout: data}));
      }
    });

  }
});

exports.index = function() {
  new Index();
};

exports.edit = function(id) {
  new Edit({id: id});
};

exports.show = function(id) {
  new Show({id: id});
};



