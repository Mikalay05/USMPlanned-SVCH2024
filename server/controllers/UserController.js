const ApiError = require("../error/ApiError");

class UserController {
    /*
    *========== Request ==========
    */
    userIdNameInRequest = 'userId';

    async getDataRequest(req, res) {
        const { userId } = req.params;
        try {
            res.status(200).json({ message: `user ${userId}` });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }

    async getAllRequest(req, res) {
        try {
            res.status(200).json({ message: 'All users fetched' });
        } catch (err) {
            throw new ApiError.badRequest(err.message || "An error occurred");
        }
    }
}

module.exports = new UserController();