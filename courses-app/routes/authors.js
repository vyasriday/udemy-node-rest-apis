const express = require('express');
const Author = require('../models/author');
const router = express.Router();

router.get('', (req, res) => {
  Author.find()
    .then((authors) => res.status(200).send(authors))
    .catch((err) => res.status(400).send(err));
});

router.post('', (req, res) => {
  const body = req.body;
  const author = new Author(body);
  author.validate((err) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    author
      .save()
      .then((author) => res.status(200).send({ IsPosted: true }))
      .catch((err) => res.status(400).send(err));
  });
});

module.exports = router;
