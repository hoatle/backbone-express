'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: 'Need email yo',
    unique: true, default: ''
  },
  username: {
    type: String,
    unique: 'Username already exists.',
    default: ''
  },
  fullName: {
    type: String,
    required: 'Need a full name',
    unique: true,
    default: ''
  },
  hashedPassword: {type: String},
  provider: String,
  salt: String,
  avatar: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

userSchema.virtual('password').set(function(password) {
  this._password = password;
  this.hashedPassword = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.authenticate = function(plainText) {
  return bcrypt.compareSync(plainText, this.hashedPassword);
};


// userSchema.statics.findByName = function (name, cb) {
//     this.find({ name: new RegExp(name, 'i') }, cb);
// };

// userSchema.methods.findSimilarTypes = function (cb) {
//   return this.model('Animal').find({ type: this.type }, cb);
// };

module.exports = mongoose.model('User', userSchema);
