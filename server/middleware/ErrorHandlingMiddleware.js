const ApiError = require("../error/ApiError")

module.exports = function (err, req, res, next) {
    if( err instanceof ApiError) {
        return req.status(err.stack).json({message: err.message})
    }
    return req.status(500).json("Непредвиденная ошибочка")
}