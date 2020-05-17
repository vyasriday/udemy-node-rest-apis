const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

router.get('', (req, res) => {
  Movie.find()
    .populate('genre', '-_id -__v')
    .then((movies) => res.status(200).send(movies))
    .catch((err) => res.status(400).send(err));
});

router.post('', (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((movie) => res.status(200).send({ IsPosted: true }))
    .catch((err) => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Movie.findOneAndDelete(id)
    .then((movie) => res.send(movie))
    .catch(console.log);
});

module.exports = router;
