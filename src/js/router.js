'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// Templates
var faqTemplate = require('./templates/static/faq.html');

// Controllers
var homeController = require('./controllers/home');
var shoutsController = require('./controllers/shouts');
// var shoutsController = require('./controllers/shouts');

// Models
// var models = require('./models/memory/employee');

module.exports = Backbone.Router.extend({

  routes: {
    '': homeController.home,
    'home2': homeController.home2,
    'faq': 'faq',
    'shouts': shoutsController.index,
    'shouts/new': shoutsController.new,
    'shouts/create': shoutsController.create

  },

  faq: function () {
    $('#app').html(faqTemplate({foo: 'bar'}));
  }

});