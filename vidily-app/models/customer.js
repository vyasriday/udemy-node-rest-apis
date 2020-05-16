const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },

  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
});

module.exports = mongoose.model('customer', Schema);
