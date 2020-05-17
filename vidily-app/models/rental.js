const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
  },
});

module.exports = mongoose.model('rental', Schema);
