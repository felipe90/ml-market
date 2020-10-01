'use-strict';

const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items.controller');

//Get a list of items
router.get('/', itemsController.getItems);
router.get('/:id?', itemsController.getItem);

module.exports = router;
