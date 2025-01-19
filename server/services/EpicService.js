const ApiError = require("../error/ApiError");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { Epic } = require('../models/models');


class EpicService {

  async getEpicActionById(epicId) {
    try {
      const params = [epicId];
      const rows = await dbQuery(QUERIES.GET_EPIC_ACTIONS_BY_ID, params);
      const actions = rows[0].get_epic_actions;  // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения actions для customer", {
        epicId,
        error: err.message
      });
    }
  }
}

module.exports = new EpicService();
