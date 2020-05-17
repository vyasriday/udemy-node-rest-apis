const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: String,
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'genre',
    },
  ],
  numberInStock: Number,
  dailyRentalRate: Number,
});

module.exports = mongoose.model('movie', Schema);
