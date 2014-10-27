'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var template = require('../../tpl/login.html');
Backbone.$ = $;



module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        // $('#content').html('We got some mother nucking text.');
        $('#content').html(template({foo: 'bar'}));
        // this.$el.html('We got some mother fucking text.');
        // return this;
    }

});
