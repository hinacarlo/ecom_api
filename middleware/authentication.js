const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

exports.authenticate = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
    try {
        const { name, userId, role } = isTokenValid({ token })
        req.user = { name, userId, role }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}

exports.authorizePermissions = (...roles) => {
    // if (req.user.role !== 'admin') {
    //     throw new CustomError.UnauthenticatedError('Unauthorized to access this route')
    // }
    // next()
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthenticatedError('Unauthorized to access this route')
        }
        next()
    }
}

