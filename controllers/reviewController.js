const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
	const { product: productId } = req.body;

	const isValidProduct = await Product.findById(productId);

	if (!isValidProduct) {
		throw new CustomError.NotFoundError(`No product with id: ${productId}`);
	}

	const alreadyReviewed = await Review.findOne({
		product: productId,
		user: req.user.userId,
	});

	if (alreadyReviewed) {
		throw new CustomError.BadRequestError('Already reviewed this product');
	}

	req.body.user = req.user.userId;
	const review = await Review.create(req.body);

	res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
	const reviews = await Review.find({});

	res.status(StatusCodes.OK).json({ 'review count': reviews.length, reviews });
};

const getReview = async (req, res) => {
	const { id } = req.params;

	const review = await Review.findById(id);

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${id}`);
	}

	res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
	res.send('update review');
};

const deleteReview = async (req, res) => {
	const { id } = req.params;

	const review = await Review.findById(id);

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${id}`);
	}
	checkPermissions(req.user, review.user);
	await review.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' });
};

module.exports = {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
};
