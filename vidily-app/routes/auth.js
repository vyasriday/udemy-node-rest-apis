const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send('Invalid Username or Password');
    return;
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  const token = user.generateAuthToken();

  validPassword
    ? res
        .header('x-auth-token', token)
        .status(200)
        .send({ profile: _.pick(user, ['name', 'email']), token })
    : res.status(400).send('Invalid Password');
});

module.exports = router;
