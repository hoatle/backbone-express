'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

// var model = require('../models/auth.js');

var user = require('../models/user');

var template = require('../templates/login.html');

var Login = Backbone.View.extend({
    // model: new model(),
    el: '#app',
    events: {
        'click #login': 'login'
    },
    initialize: function () {
        this.render();
    },
    render: function () {
      this.$el.html(template());
      //test
      this.$('#email').val('hoatlevan@gmail.com');
      this.$('#password').val('123456');
    },
    login: function (event) {
        event.preventDefault();

        //TODO: validate email + password

        var currentUser = user.User.getUser();
        var token = new user.UsernamePasswordToken({
            username: this.$('#email').val(),
            password: this.$('#password').val()
        });

        currentUser.login(token, function(err) {
            if (err) {
                alert(err.message);
                return;
            }

            console.log(currentUser);

        });
    }
});

module.exports = function() {
  new Login();
};



//  $(function () {
//     var LoginView = Backbone.View.extend({
//         model: new App.Model.authentication(),
//         el: $("#login-form"),
//         events: {
//             "click #login": "login"
//         },

//         login: function () {
//             this.model.save({username: this.$el.find("#username"),
//                 password: this.$el.find("#password")}, {
//                 success: function () {
//                     /* update the view now */
//                 },
//                 error: function () {
//                     /* handle the error code here */
//                 }
//             });
//         }
//     });
// }



// checkUser: function(callback) {
//      $.ajax('api/auth/logged_in', {
//        type: 'GET',
//        dataType: 'json',
//        success: function() {
//          return callback(true);
//        },
//        error: function() {
//          return callback(false);
//        }
//      });
//   }
