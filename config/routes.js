'use strict';

var page = require('../controllers/pages');

module.exports = function(app) {
  app.get('/rand', page.rand);
};
