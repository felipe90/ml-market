'use-strict';

const express = require('express');
const router = express.Router();

const filtersController = require('../controllers/filters.controller');

//Get all filters
router.get('/api/filters', filtersController.getFilters);

module.exports = router;
