'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// views
var home = require('./views/home');
var shouts = require('./views/shouts');
var pages = require('./views/pages');


module.exports = Backbone.Router.extend({

  routes: {
    '': home,
    
    'faq': pages.faq,

    'shouts': shouts.index,
    'shouts/new': shouts.edit,
    'shouts/:id': shouts.show,
    'shouts/:id/edit': shouts.edit,
    
    'login': require('./views/login'),
    'join': require('./views/join'),

    'users': require('./views/users-index'),
    'users/:id': require('./views/profile'),


  }

});