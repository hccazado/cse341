const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const {validationRules, validate} = require("../services/validator");

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validationRules(), validate, contactsController.createContact);

router.put('/:id', validationRules(), validate, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
