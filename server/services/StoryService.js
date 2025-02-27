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
      throw ApiError.internal("Ошибка получения actions для story", {
        storyId,
        error: err.message
      });
    }
  }
  async getStoryData(paths) {
    try {
      const params = [paths.storyId];
      const rows = await dbQuery(QUERIES.GET_STORY_DATA_BY_ID, params);
      const actions = rows[0].process_story;  // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения data для story", {
        paths,
        error: err.message
      });
    }
  }
  async getChainForSelect(storyId) {
    try {
      const params = [storyId];
      const rows = await dbQuery(QUERIES.GET_CHAIN_OF_TASKS_FOR_STORY, params);
      const actions = rows[0].get_chain_of_tasks_for_story;  // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения chain для story", {
        paths,
        error: err.message
      });
    }
  }
}

module.exports = new StoryService();
