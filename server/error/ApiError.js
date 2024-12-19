class ApiError extends Error {
    constructor(status, message, body = null) {
        super(message); // Передаем сообщение в родительский класс
        this.message = message;
        this.status = status;
        this.body = body; // Добавляем тело ошибки
    }

    /**
     * Создает ошибку 400 (Bad Request).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 400.
     */
    static badRequest(message, body = null) {
        return new ApiError(400, message, body);
    }

    /**
     * Создает ошибку 401 (Unauthorized).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 401.
     */
    static unauthorized(message, body = null) {
        return new ApiError(401, message, body);
    }

    /**
     * Создает ошибку 403 (Forbidden).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 403.
     */
    static forbidden(message, body = null) {
        return new ApiError(403, message, body);
    }

    /**
     * Создает ошибку 404 (Not Found).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 404.
     */
    static notFound(message, body = null) {
        return new ApiError(404, message, body);
    }

    /**
     * Создает ошибку 409 (Conflict).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 409.
     */
    static conflict(message, body = null) {
        return new ApiError(409, message, body);
    }

    /**
     * Создает ошибку 500 (Internal Server Error).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 500.
     */
    static internal(message, body = null) {
        return new ApiError(500, message, body);
    }

    /**
     * Создает ошибку 501 (Not Implemented).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 501.
     */
    static notImplemented(message, body = null) {
        return new ApiError(501, message, body);
    }

    /**
     * Создает ошибку 503 (Service Unavailable).
     * @param {string} message - Сообщение об ошибке.
     * @param {any} body - Дополнительное тело ошибки.
     * @returns {ApiError} - Экземпляр ApiError с кодом 503.
     */
    static serviceUnavailable(message, body = null) {
        return new ApiError(503, message, body);
    }
}

module.exports = ApiError;