const mongoose = require('mongoose');

const Genre = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  genre: {
    type: Array,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: 'Atleast One Genre is Required',
    },
  },
});

module.exports = Genre;
