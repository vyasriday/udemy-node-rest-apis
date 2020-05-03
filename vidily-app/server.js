require('dotenv-flow').config();
const startupDebugger = require('debug')('app:startup');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const genreRoutes = require('./routes/genres');
const homeRoute = require('./routes/home');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('combined'));

// tell express to use our routes
app.use('/api/genres', genreRoutes);
app.use('/', homeRoute);
// this should go in last as all routes match /
// set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
  startupDebugger('Starting the server');
  console.log(`Sever running at PORT 8000`);
});
