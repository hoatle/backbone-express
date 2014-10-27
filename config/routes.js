'use strict';

var page = require('../controllers/pages');
var shouts = require('../controllers/shouts');

module.exports = function(app) {
  app.get('/rand', page.rand);

  app.get('/shouts', shouts.index);
};
