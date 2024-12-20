import $api from "../http/index";

export default class BaseService {
    constructor() {
        this.initializeAsyncMethods();
    }

    static AsyncCatch(fn) {
        return async (...args) => {
            try {
                const result = await fn(...args);
                return result;
            } catch (error) {
                if (error.response) {
                    console.error("Cтатус:", error.response.status, "Ошибка:", error.response.data.message);
                    alert(`Ошибка: ${error.response.data.message}`);
                } else {
                    console.error("Ошибка:", error.message);
                    alert(`Ошибка: ${error.message}`);
                }
            }
        };
    }

    initializeAsyncMethods() {
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (const method of methods) {
            if ( typeof this[method] === "function" && method !== "constructor") {
                this[method] = BaseService.AsyncCatch(this[method]);
            }
        }
    }

    static async request(method, url, data = null) {
        const response = await $api[method](url, data);
        return response.data;
    }
}