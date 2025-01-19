const ApiError = require("../error/ApiError");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { Story } = require('../models/models');


class StoryService {

  async getStoryActionById(storyId) {
    try {
      const params = [storyId];
      const rows = await dbQuery(QUERIES.GET_STORY_ACTIONS_BY_ID, params);
      const actions = rows[0].get_story_actions;  // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения actions для customer", {
        storyId,
        error: err.message
      });
    }
  }
}

module.exports = new StoryService();
