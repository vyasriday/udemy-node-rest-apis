const express = require('express');
const router = express.Router();
const Course = require('../schemas/course');

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
});

router.get('/:id', async (req, res) => {
  // req.params stores route params as string.
  const id = parseInt(req.params.id);
  try {
    const course = await Course.findById(id);
    res.status(200).send(course);
  } catch {
    res.status(400).send('Course not found');
  }
});

router.post('/', (req, res) => {
  const course = new Course(req.body);
  course.validate((err) => {
    if (!err) {
      course
        .save()
        .then((course) => res.status(200).send(course))
        .catch((err) => {
          res.status(400).send(err.message);
        });
    } else {
      console.log(err);
      res.status(400).send(err.message);
    }
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  Course.findByIdAndUpdate(id, req.body)
    .then((course) => console.log(course))
    .catch((err) => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  Course.findByIdAndDelete(id)
    .then((course) => res.send(course))
    .catch(console.log);
});

module.exports = router;
