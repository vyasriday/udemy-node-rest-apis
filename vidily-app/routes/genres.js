const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Genre = require('../models/genre');

router.get('', (req, res) => {
  Genre.find()
    .then((genres) => res.status(200).send(genres))
    .catch((err) => res.status(400).send(err));
});

// these routes are prefixed by /api/genres
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Genre.findById(id)
    .then((genre) => res.status(200).send(genre))
    .catch((err) => res.status(400).send('Document not found!'));
});

router.post('', (req, res) => {
  const genre = new Genre(req.body);
  genre.validate((err) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    genre
      .save()
      .then((r) => res.status(200).send({ IsPosted: true }))
      .catch((err) => res.status(400).send('Error Occured'));
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Genre.findByIdAndUpdate(id, req.body)
    .then((genre) => res.status(200).send(genre))
    .catch((genre) => res.status(400).send('Invalid Document Id'));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Genre.findByIdAndDelete(id)
    .then((genre) => res.status(200).send(genre))
    .catch((err) => res.status(400).send('Invalid Document'));
});

module.exports = router;
