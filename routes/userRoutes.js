const express = require('express')
const userRouter = express.Router()

const {
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

userRouter.get('/', getAllUsers)

userRouter.get('/showMe', showCurrentUser)
userRouter.post('/updateUser', updateUser)
userRouter.post('/updateUserPassword', updateUserPassword)

userRouter.get('/:id', getUser)

module.exports = userRouter
