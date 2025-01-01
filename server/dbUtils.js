const db = require("./db");
const ApiError = require("./error/ApiError");

async function dbQuery(query, params = []) {
    try {
        const result = await db.query(query, { bind: params, type: db.QueryTypes.SELECT })
        console.log(result);
        return  result;
    } catch (err) {
        console.error("Database query failed:", err);
        throw ApiError.internal("Ошибка выполнения запроса к базе данных");
    }
}

module.exports = { dbQuery };
