const express = require('express');
const User = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/me', async (req, res) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400));
});

router.get('', (req, res) => {
  User.find().then((users) => res.send(users));
});

router.post('', async (req, res) => {
  // check if user is registered or not
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send('Email already exists');
    return;
  }

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user
    .save()
    .then((user) => res.status(200).send({ IsPosted: true }))
    .catch((err) => res.status(400).send('Error Occured', err));
});

module.exports = router;
