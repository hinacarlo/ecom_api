const express = require('express');
const productRouter = express.Router();
const {
	authenticate,
	authorizePermissions,
} = require('../middleware/authentication');
const {
	createProduct,
	getAllProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} = require('../controllers/productController');

const { getProductReviews } = require('../controllers/reviewController');

productRouter
	.route('/')
	.post([authenticate, authorizePermissions('admin')], createProduct)
	.get(getAllProduct);

productRouter
	.route('/uploadImage')
	.post([authenticate, authorizePermissions('admin')], uploadImage);

productRouter
	.route('/:id')
	.get(getProduct)
	.patch([authenticate, authorizePermissions('admin')], updateProduct)
	.delete([authenticate, authorizePermissions('admin')], deleteProduct);

// alternative way to get product review without using virtuals on the model
productRouter.route('/:id/reviews').get(getProductReviews);

module.exports = productRouter;
