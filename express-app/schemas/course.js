const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  tags: [String],
  isPublished: Boolean,
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('course', Schema);

module.exports = Course;
