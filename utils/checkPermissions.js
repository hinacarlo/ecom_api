const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
	// this is to unauthorize user that wants to peek at other user info besides the admin
	if (requestUser.role === 'admin') return;
	if (requestUser.userId === resourceUserId.toString()) return;
	throw new CustomError.UnauthorizedError(
		'Not authorized to access this route'
	);
};

module.exports = checkPermissions;
