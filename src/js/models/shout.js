'use strict';

var Shout = Backbone.Model.extend({

  urlRoot: '/shouts',

  idAttribute: '_id',

  defaults: {
    name: 'Anon',
    msg: 'No msg'
  }
});

var ShoutCollection = Backbone.Collection.extend({

    model: Shout,

    url: '/shouts'

});