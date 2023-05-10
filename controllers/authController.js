const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../errors')
const { createJWT } = require('../utils')

const registerController = async (req, res) => {
    const { email, name, password } = req.body

    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new BadRequestError('Email already exists!')
    }

    const isFirstUser = await User.countDocuments({}) === 0
    const role = isFirstUser ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role })

    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    const token = createJWT({ payload: tokenUser })
    console.log(token)

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay)
    })

    res.status(StatusCodes.CREATED).json({ user: tokenUser })
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
