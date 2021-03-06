require('dotenv-flow').config();
const startupDebugger = require('debug')('app:startup');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// middlewares
const auth = require('./middlewares/auth');

// routes
const genreRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');
const moviesRoutes = require('./routes/movies');
const rentalRoutes = require('./routes/rentals');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

const PORT = process.env.PORT || 8000;

// database connection

mongoose
  .connect('mongodb://localhost/vidily', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log('Connected to Database'))
  .catch(console.log);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// adding authentication middleware
app.use(auth);
// app.use(helmet());
// app.use(morgan('combined'));

// tell express to use our routes
app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/', homeRoute);
// this should go in last as all routes match /
// set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
  startupDebugger('Starting the server');
  console.log(`Sever running at PORT 8000`);
});
