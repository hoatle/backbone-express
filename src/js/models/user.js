'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var currentUser;

/**
 * UsernamePasswordToken model class
 */
var UsernamePasswordToken = Backbone.Model.extend({

    getPrinciple: function () {
        return this.getUsername();
    },

    getCredentials: function () {
        return this.getPassword();
    },

    /**
     * Sets to remember me or not
     *
     * @param isRemembered
     */
    setRememberMe: function (isRemembered) {
        (isRemembered == true) && this.set('rememberMe', true);
    },

    isRememberMe: function() {
        return this.get('rememberMe') || false;
    },

    getUsername: function() {
        return this.get('username');
    },

    setUsername: function(username) {
        username && this.set('username', username);
    },

    getPassword: function() {
        return this.get('password');
    },

    setPassword: function(password) {
        password && this.set('password', password);
    }

});

/**
 * User model class
 */
var User = Backbone.Model.extend({
    urlRoot: '/api/users',

    initialize: function() {
        this.on('change:principles', this.onPrinciplesChange);
    },

    /**
     * Gets primary principle
     */
    getPrinciple: function () {
        return this.getPrinciples()['email'];
    },

    /**
     * Gets a map of key-value principles
     */
    getPrinciples: function () {
        return this.get('principles');
    },

    onPrinciplesChange: function(model, value, options) {
        alert('onPrinciplesChange');
        console.log(arguments);
    },

    /**
     * Logs in with the provided username and password.
     *
     * When login successfully, #getPrinciple() must be defined and #isAuthenticated() must be true
     *
     * Login code like this:
     * {code}
     * var currentUser = User.getUser();
     *
     * var username = takeUsernameInput();
     * var password = takePasswordInput();
     * var rememberMe = takeRememberMeInput();
     *
     * var token = new UsernamePasswordToken(username, password, rememberMe);
     *
     * currentUser.login(token, function (err) {
     *     if (err) {
     *         //handle error here
     *     }
     *     // successful logged-in user here, do something
     * });
     *
     * {code}
     *
     * `login:success` or `login:fail` events will be triggered passing with `user` or `err` arguments accordingly.
     *
     * @param token Token instance
     * @param done callback(err)
     */
    login: function (token, done) {
        //username just the primary principle here, could be id or email depending on the auth system implementation

        var model = this;

        this.sync('create', token, {
            url: '/api/auth/login/',
            attrs: {
                'email': token.getPrinciple(),
                'password': token.getPassword()
            }
        }).then(function(data, textStatus, xhr) {
            console.log(data); //message: user authenticated
            //update currentUser data

            //fetching user info from /api/auth/user
            model.sync('get', model, {
                url: '/api/auth/user/'
            }).then(function(data, textStatus, xhr) {
                console.log(data);

                var userPrinciples = _.pick(data, '_id', 'avatar', 'email', 'fullName', 'username');
                User.getUser().set('principles', userPrinciples);
                //TODO: listen to changes events to update localstorage
                /*
                 var localstorage = require('../localstorage');
                 localstorage.set('user-principles', userPrinciples, true);
                 */
                done(null);
            }, function(xhr, textStatus, errorThrown) {
                done(_.extend(xhr.responseJSON, {
                    textStatus: textStatus,
                    errorThrown: errorThrown
                }));
            });

        }, function(xhr, textStatus, errorThrown) {
            done(_.extend(xhr.responseJSON, {
                textStatus: textStatus,
                errorThrown: errorThrown
            }));
        });

    },

    /**
     * Logs out this User and invalidates and/or removes any associated entities,
     *
     * After logout successfully, current user must be anonymous and could be used as such.
     */
    logout: function () {

    },

    /**
     * Returns true if this User has an identity (it is not anonymous) and the identity
     * (aka {@link #getPrincipals() principals}) is remembered from a successful authentication during a previous
     * session.
     *
     * @returns boolean
     */
    isRemembered: function () {
        return (this.getPrinciple() != undefined) && !this.isAuthenticated();
    },

    /**
     * Returns true if this User proved their identity <em>during their current session</em>
     * by providing valid credentials matching those known to the system, false otherwise.
     *
     * @return bool
     */
    isAuthenticated: function () {

    }

}, {
    /**
     * Gets current user, always the same user though out the browser session
     *
     * var currentUser = User.getUser();
     */
    getUser: function () {
        //try to get user from cookie['currentUser']
        //otherwise, return new User instance (anonymous user)
        if (currentUser) {
            return currentUser;
        } else {
            //get from localstorage


        }

        //otherwise, return new
        currentUser = new User();
        return currentUser;
    },
    /**
     * Saves user to localStorage so that getUser could get it back
     * @param user
     */
    saveUser: function (user) {

    }
});

var Users = Backbone.Collection.extend({
    url: '/api/users'
});

module.exports = {
    UsernamePasswordToken: UsernamePasswordToken,
    User: User,
    Users: Users
};
