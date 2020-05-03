const express = require('express');
const router = express.Router();
// set database
let genres = [];

router.get('', (req, res) => {
  console.log(req.custom);
  res.send(genres);
});

// these routes are prefixed by /api/genres
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = genres.find((genre) => genre.id === id);
  if (!item) {
    res.status(404).send('Genre not found!!!');
    return;
  }
  res.status(200).send(item);
});

router.post('', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    genre: req.body.genre,
  };
  if (typeof req.body !== 'object') {
    res.status(400).send('Data malformed');
    return;
  }
  genres = [...genres, genre];
  res.send('Data Posted Successfully!');
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = genres.find((genre) => genre.id === id);
  if (!item) {
    res.status(404).send('Genre not found!!!');
    return;
  }
  genres = genres.map((genre) => {
    if (genre.id === id) {
      return { ...item };
    }
    return genre;
  });
  res.send(genres[id]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = genres.find((genre) => genre.id === id);
  if (!item) {
    res.status(404).send('Genre not found!!!');
    return;
  }
  genres = genres.filter((genre) => genre.id !== id);
  res.send(genres[id]);
});

module.exports = router;
