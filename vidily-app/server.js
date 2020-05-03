require('dotenv-flow').config();
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const authentication = require('./middlewares/authentication');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('combined'));
// creating a custom middleware
app.use(logger);
app.use(authentication);

// app.get('env') // returns process.env.NODE_ENV. if not set default returns development
// set database
let genres = [];

// set routes
app.get('/', (req, res) => {
  res.sendFile('index.html'); // find this file in public directory
});

app.get('/api/genres', (req, res) => {
  console.log(req.custom);
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = genres.find((genre) => genre.id === id);
  if (!item) {
    res.status(404).send('Genre not found!!!');
    return;
  }
  res.status(200).send(item);
});

app.post('/api/genres', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    genre: req.body.genre,
  };
  if (typeof req.body !== 'object') {
    res.status(400).send('Data malformed');
    return;
  }
  dbDebugger('Adding data to database');
  genres = [...genres, genre];
  res.send('Data Posted Successfully!');
});

app.put('/api/genres/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = genres.find((genre) => genre.id === id);
  if (!item) {
    res.status(404).send('Genre not found!!!');
    return;
  }
  genres = genres.filter((genre) => genre.id !== id);
  res.send(genres[id]);
});

app.listen(PORT, () => {
  startupDebugger('Starting the server');
  console.log(`Sever running at PORT 8000`);
});
