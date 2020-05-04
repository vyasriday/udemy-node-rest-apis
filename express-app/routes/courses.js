const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  // req.params stores route params as string.
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(404).send('Resource not found');
    return;
  }
  res.status(200).send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((course) => course.id === id);
  if (!course) {
    res.status(400).send('Course does not exist!');
    return;
  }
  courses = courses.filter((course) => course.id !== id);
  res.send(course);
});

module.exports = router;
