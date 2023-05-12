const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const CustomError = require('../errors')

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }, '-password')

    res.status(StatusCodes.OK).json({
        'number of users': users.length,
        users
    })
}
const getUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id, '-password')

    if (user) {
        return res.status(StatusCodes.OK).json({
            user
        })
    } else {
        throw new CustomError.NotFoundError(`No user with id: ${id}`)
    }
}

const showCurrentUser = async (req, res) => {
    res.send('show current user')
}

const updateUser = async (req, res) => {
    res.send('update user')
}

const updateUserPassword = async (req, res) => {
    res.send('update user password')
}

module.exports = {
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
