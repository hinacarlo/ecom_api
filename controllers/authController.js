const registerController = async (req,res) => {
    res.send('register user')
}
const loginController = async (req,res) => {
    res.send('login user')
}
const logoutController = async (req,res) => {
    res.send('logout user')
}

module.exports = {
    registerController,
    loginController,
    logoutController
}
