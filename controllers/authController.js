const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../errors')

const registerController = async (req, res) => {
    const { email, name, password } = req.body

    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new BadRequestError('Email already exists!')
    }

    const isFirstUser = await User.countDocuments({}) === 0
    const role = isFirstUser ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role })
    res.status(StatusCodes.CREATED).json({ user })
}
const loginController = async (req, res) => {
    res.send('login user')
}
const logoutController = async (req, res) => {
    res.send('logout user')
}

module.exports = {
    registerController,
    loginController,
    logoutController
}
