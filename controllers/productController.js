const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
	req.body.user = req.user.userId;
	const products = await Product.create(req.body);

	res.status(StatusCodes.CREATED).json({ products });
};

const getAllProduct = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json({
		'products count': products.length,
		products,
	});
};

const getProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id).populate('reviews');

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id: ${id}`);
	}

	res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id: ${id}`);
	}

	res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id: ${id}`);
	}

	await product.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
};

const uploadImage = async (req, res) => {
	if (!req.files) {
		throw new CustomError.BadRequestError('No File Uploaded');
	}
	const productImage = req.files.image;

	if (!productImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('Please Upload Image');
	}

	const maxSize = 1024 * 1024;

	if (productImage.size > maxSize) {
		throw new CustomError.BadRequestError(
			'Please upload image smaller than 1MB'
		);
	}

	const imagePath = path.join(
		__dirname,
		'../public/uploads/' + `${productImage.name}`
	);
	await productImage.mv(imagePath);

	res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
	createProduct,
	getAllProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
};
