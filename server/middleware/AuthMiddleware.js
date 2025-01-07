const ApiError = require("../error/ApiError");
const TokenService = require("../services/TokenService");

module.exports = function (req, res, next) {
    try {
        const authToken = req.headers.authorization; 
        if (!authToken || !authToken.startsWith('Bearer ')) {
            return next(ApiError.unauthorized('Authorization token is missing or invalid'));
        }

        const valueAuthToken = authToken.split(' ')[1];
        const data = TokenService.validateAccessToken(valueAuthToken);

        if (!data) {
            return next(ApiError.unauthorized('Invalid or expired token'));
        }

        req.userIdFromToken = data.userId;
        req.roleIdFromToken = data.roleId;

        next();
    } catch (err) {
        return next(ApiError.unauthorized('An error occurred during token validation'));
    }
};
