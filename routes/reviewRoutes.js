const express = require('express');
const reviewRouter = express.Router();
const {
	authenticate,
	authorizePermissions,
} = require('../middleware/authentication');
const {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviewController');

reviewRouter.route('/').get(getAllReviews).post(authenticate, createReview);

reviewRouter
	.route('/:id')
	.get(getReview)
	.patch(authenticate, updateReview)
	.delete(authenticate, deleteReview);

module.exports = reviewRouter;
