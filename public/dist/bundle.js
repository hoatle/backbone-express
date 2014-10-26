(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var test = require('./lib/test');

test();

// var person = new Person({name: "Tim", age: 5});
// var person2 = new Person({name: "Jill", age: 15});


// var Router = Backbone.Router.extend({

//     routes: {
//         ''                  : 'home',
//         'faq'             : 'faq',
//         'route/:id'         : 'defaultRoute'
//     },

//     // initialize: function () {
//     //     this.headerView = new HeaderView();
//     //     $('.header').html(this.headerView.el);
//     // },

//     home: function () {
//         viewport.render( 'You clicked home' );
//     },

//     faq: function () {
//         viewport.render( 'You clicked faq' );
//     },

//     defaultRoute: function( routeId ) {
//        viewport.render( 'You clicked route "' + routeId + '"' );
//     }

// });

// var personView = new PersonView({
//     model: person
// });


// Set el of the views.
// personView.el = $('#personContainer');
// personView.render();

// var router = new Router();


// Backbone.history.start();








},{"./lib/test":2}],2:[function(require,module,exports){
'use strict';

module.exports = function() {
  console.log('We are inside test.js');
  console.log('But are we?');
};
},{}]},{},[1]);
