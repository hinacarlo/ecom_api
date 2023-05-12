const express = require('express')
const userRouter = express.Router()
const { authenticate, authorizePermissions } = require('../middleware/authentication')

const {
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

userRouter.get('/', authenticate, authorizePermissions('admin', 'owner'), getAllUsers)

userRouter.get('/showMe', authenticate, showCurrentUser)
userRouter.patch('/updateUser', updateUser)
userRouter.patch('/updateUserPassword', authenticate, updateUserPassword)

userRouter.get('/:id', authenticate, getUser)

module.exports = userRouter
