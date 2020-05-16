const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('', (req, res) => {
  Customer.find()
    .then((customers) => res.status(200).send(customers))
    .catch((err) => res.status(400).send(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Customer.findById(id)
    .then((customer) => res.status(200).send(customer))
    .catch((err) => res.status(400).send('Document not found'));
});

router.post('', (req, res) => {
  const customer = new Customer(req.body);
  customer.validate((err) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    customer
      .save()
      .then((customer) => res.status(200).send({ IsPosted: true }))
      .catch((err) => res.status(400).send('Errors Occured'));
  });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  customer.validate((err) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    customer.update(id, {
      $set: {
        ...req.body,
      },
    });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndDelete(id)
    .then((customer) => res.status(200).send(customer))
    .catch((err) => res.status(400).send('Document Not Found'));
});

module.exports = router;
