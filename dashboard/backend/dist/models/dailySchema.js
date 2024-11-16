"use strict";

var mongoose = require('mongoose');
var dailyTaskSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  reward: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var daily = mongoose.model('DailyTasks', dailyTaskSchema, 'dailyTasks');
module.exports = daily;