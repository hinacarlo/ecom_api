const express = require('express')
const authRouter = express.Router()

const { registerController, loginController, logoutController } = require('../controllers/authController')

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/logout', logoutController)

module.exports = authRouter
