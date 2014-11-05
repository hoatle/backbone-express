'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var home = require('./controllers/home');
var shouts = require('./controllers/shouts');
var pages = require('./controllers/pages');

module.exports = Backbone.Router.extend({

  routes: {
    '': home,
    'faq': pages.faq,

    'shouts': shouts.index,
    'shouts/new': shouts.new,
    // 'shouts/create': shouts.create,
    'shouts/:id': shouts.show,
    'shouts/:id/edit': shouts.edit,
    // 'shouts/:id/update': shouts.update,
    // 'shouts/:id/delete': shouts.destroy,
    // 'shouts/:id/like': shouts.like, 

  }

});