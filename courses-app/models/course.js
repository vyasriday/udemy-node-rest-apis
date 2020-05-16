const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    // name of collection in singular
  },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: 'A course should have atleast one tag',
    },
  },
  isPublished: Boolean,
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model('course', Schema);

module.exports = Course;
