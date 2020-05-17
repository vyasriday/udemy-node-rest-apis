const express = require('express');
const Rental = require('../models/rental');
const Movie = require('../models/movie');
const router = express.Router();

router.get('', (req, res) => {
  Rental.find()
    .populate('movie', 'title numberInStock -_id')
    .populate('customer', 'name -_id')
    .then((rentals) => res.status(200).send(rentals))
    .catch((err) => res.status(400).send(err));
});

router.post('', (req, res) => {
  const body = req.body;
  const movieId = req.body.movie;
  const rental = new Rental(body);
  rental
    .save()
    .then((rental) => {
      Movie.findByIdAndUpdate(movieId, {
        $inc: {
          numberInStock: -1,
        },
      })
        .then((movie) => res.status(200).send(rental))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
