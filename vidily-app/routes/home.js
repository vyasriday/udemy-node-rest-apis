const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  res.render('index.pug', {
    title: 'Express Demo App',
    message: 'Hi! This is an express app!!!',
  });
});

module.exports = router;
