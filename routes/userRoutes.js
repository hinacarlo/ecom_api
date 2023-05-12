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

userRouter.get('/showMe', showCurrentUser)
userRouter.post('/updateUser', updateUser)
userRouter.post('/updateUserPassword', updateUserPassword)

userRouter.get('/:id', authenticate, getUser)

module.exports = userRouter
