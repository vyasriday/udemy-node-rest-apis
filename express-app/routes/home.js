const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  res.render('index.pug', {
    heading: 'Express Demo App',
    message: 'This basic demo implements node and express',
  });
});

module.exports = router;
