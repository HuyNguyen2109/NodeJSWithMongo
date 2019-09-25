'use strict';

const express = require('express');
const router = express.Router();
const listingsAndReviewsController = require('../controllers/listingsAndReviews');

router.get('/all/page/:page', listingsAndReviewsController.getAllRecordsWithPagination);

router.get('/by-id/:id', listingsAndReviewsController.getRecordById);

router.get('/by-ids', listingsAndReviewsController.getRecordByMultipleIds);

router.post('/create', listingsAndReviewsController.createRecord);

router.delete('/by-id/:id', listingsAndReviewsController.deleteRecord);

module.exports = router;

