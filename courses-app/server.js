require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const app = express();
const PORT = process.env.PORT || 4000;

// database connection
mongoose
  .connect('mongodb://localhost/node-playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log('Connected to Database!!!'))
  .catch(console.log);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// routes middleware
app.use('/api/courses', coursesRoutes);
app.use('/', homeRoute);
// set views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
