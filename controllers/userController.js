const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

const getAllUsers = async (req, res) => {
	console.log(req.user);
	const users = await User.find({ role: 'user' }, '-password');

	res.status(StatusCodes.OK).json({
		'number of users': users.length,
		users,
	});
};
const getUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id, '-password');

	if (user) {
		return res.status(StatusCodes.OK).json({
			user,
		});
	} else {
		throw new CustomError.NotFoundError(`No user with id: ${id}`);
	}
};

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
	const { email, name } = req.body;
	if (!email || !name) {
		throw new CustomError.BadRequestError('Please provide all values');
	}
	const user = await User.findOneAndUpdate(
		{ _id: req.user.userId },
		{ email, name },
		{ new: true, runValidators: true }
	);

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });

	res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
	const { oldPass, newPass } = req.body;

	if (!oldPass || !newPass) {
		throw new CustomError.BadRequestError('Please provide both values');
	}

	const user = await User.findById(req.user.userId);

	const isPasswordCorrect = await user.comparePassword(oldPass);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	user.password = newPass;

	await user.save();

	res.status(StatusCodes.OK).json({ msg: 'Success! Password updated!' });
};

module.exports = {
	getAllUsers,
	getUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};
