'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// Templates
var faqTemplate = require('./templates/static/faq.html');

// Controllers
var homeController = require('./controllers/home');
var shoutsController = require('./controllers/shouts');

module.exports = Backbone.Router.extend({

  routes: {
    '': new homeController.home(),
    'home2': homeController.home2,
    'faq': 'faq',

    'shouts': shoutsController.index,
    'shouts/new': shoutsController.new,
    // 'shouts/create': shoutsController.create,
    'shouts/:id': shoutsController.show,
    'shouts/:id/edit': shoutsController.edit,
    // 'shouts/:id/update': shoutsController.update,
    // 'shouts/:id/delete': shoutsController.destroy,
    // 'shouts/:id/like': shoutsController.like, 

  },

  faq: function () {
    $('#app').html(faqTemplate({foo: 'bar'}));
  }

});