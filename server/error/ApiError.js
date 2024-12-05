class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
        /**
     * Создает ошибку 400 (Bad Request).
     * Используется, когда запрос не может быть обработан из-за неверного синтаксиса.
     * @param {string} message - Сообщение об ошибке.
     * @returns {ApiError} - Экземпляр ApiError с кодом 400.
     */
        static badRequest(message) {
            return new ApiError(400, message);
        }
    
        /**
         * Создает ошибку 401 (Unauthorized).
         * Используется, когда доступ к ресурсу требует аутентификации, но пользователь не авторизован.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 401.
         */
        static unauthorized(message) {
            return new ApiError(401, message);
        }
    
        /**
         * Создает ошибку 403 (Forbidden).
         * Используется, когда сервер понимает запрос, но отказывается его выполнять.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 403.
         */
        static forbidden(message) {
            return new ApiError(403, message);
        }
    
        /**
         * Создает ошибку 404 (Not Found).
         * Используется, когда запрашиваемый ресурс не найден на сервере.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 404.
         */
        static notFound(message) {
            return new ApiError(404, message);
        }
    
        /**
         * Создает ошибку 409 (Conflict).
         * Используется, когда запрос не может быть выполнен из-за конфликта с текущим состоянием ресурса.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 409.
         */
        static conflict(message) {
            return new ApiError(409, message);
        }
    
        /**
         * Создает ошибку 500 (Internal Server Error).
         * Используется, когда происходит ошибка на стороне сервера, и запрос не может быть выполнен.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 500.
         */
        static internal(message) {
            return new ApiError(500, message);
        }
    
        /**
         * Создает ошибку 501 (Not Implemented).
         * Используется, когда сервер не поддерживает функциональность, необходимую для выполнения запроса.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 501.
         */
        static notImplemented(message) {
            return new ApiError(501, message);
        }
    
        /**
         * Создает ошибку 503 (Service Unavailable).
         * Используется, когда сервер временно не может обработать запрос из-за перегрузки или технических работ.
         * @param {string} message - Сообщение об ошибке.
         * @returns {ApiError} - Экземпляр ApiError с кодом 503.
         */
        static serviceUnavailable(message) {
            return new ApiError(503, message);
        }
}

module.exports = ApiError;