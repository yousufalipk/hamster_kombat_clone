"use strict";

var mongoose = require('mongoose');

//Referesh Token Schema
var refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
var refreshToken = mongoose.model('refreshToken', refreshTokenSchema);
module.exports = refreshToken;