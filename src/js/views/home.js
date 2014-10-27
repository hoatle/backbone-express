'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// Templates
var templateHome = require('../templates/home.html');


module.exports = Backbone.View.extend({

    el: '#app',

    initialize: function () {
        this.render();
    },

    render: function () {
        // $('#app').html(templateHome({foo: 'bar'}));
        this.$el.html(templateHome({foo: 'bar'}));
        return this;
    }

});
