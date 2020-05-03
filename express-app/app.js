require('dotenv').config();
const express = require('express');
const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
let courses = [
  {
    id: 1,
    name: 'Node Complete Course',
    price: '$10',
  },
  {
    id: 2,
    name: 'React Complete Guide',
    price: '$12',
  },
  {
    id: 3,
    name: 'Angular 8: From Beginner to End',
    price: '$15',
  },
  {
    id: 4,
    name: 'Machnine Learning: Zero to Mastery',
    price: '$15',
  },
];

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  // req.params stores route params as string.
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(404).send('Resource not found');
    return;
  }
  res.status(200).send(course);
});

app.post('/api/courses', (req, res) => {
  if (!req.body.name) {
    res.status(400).send('data is not formatted properly');
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  courses = [...courses, course];
  res.status(200).send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(400).send('Course does not exist!');
    return;
  }
  courses = courses.map((course) => {
    if (course.id === id) {
      return { ...body };
    }
    return course;
  });
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(400).send('Course does not exist!');
    return;
  }
  courses = courses.filter((course) => course.id !== id);
  res.send(course);
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
