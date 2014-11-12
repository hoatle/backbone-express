'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


/**
 * UsernamePasswordToken model class
 */
var UsernamePasswordToken = Backbone.Model.extend({

    initialize: function() {
    //init username, password, rememberMe
    },

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
     * currentUser.login(token, function (err, user) {
     *     if (err) {
     *         //handle error here
     *     }
     *     // successful user here, do something
     * });
     *
     * {code}
     *
     * @param token Token instance
     * @param done callback(err, user)
     */
    login: function (token, done) {
        //username just the primary principle here, could be id or email depending on the auth system implementation
        var username = token.getPrinciple(),
            password = token.getCredentials();

        //TODO
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
     * Gets current user
     *
     * var currentUser = User.getUser();
     */
    getUser: function () {
        //store currentUser on window.currentUser
        //if no found, try to get user from cookie['currentUser']
        //otherwise, return new User instance
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