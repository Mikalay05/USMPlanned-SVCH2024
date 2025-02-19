const ApiError = require("../error/ApiError");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { Epic } = require("../models/models");

class EpicService {
  async getEpicActionById(epicId) {
    try {
      const params = [epicId];
      const rows = await dbQuery(QUERIES.GET_EPIC_ACTIONS_BY_ID, params);
      const actions = rows[0].get_epic_actions; // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения actions для customer", {
        epicId,
        error: err.message,
      });
    }
  }
  async getEpicDataById(epicId) {
    try {
      const params = [epicId];
      const rows = await dbQuery(QUERIES.GET_EPIC_DATA_BY_ID, params);
      const data = rows[0].process_epic; // Извлекаем внутренний массив
      return data;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения actions для customer", {
        epicId,
        error: err.message,
      });
    }
  }
  async getChainForSelect(epicId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "get_chain_of_stories_for_epic";
    try {
      const params = [epicId];
      const rows = await dbQuery(QUERIES.GET_CHAIN_OF_STORIES_FOR_EPIC, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
  async createStoryForEpic(data,paths,byUserId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "create_story_and_log_action";
    try {
      /*
    p_story_name TEXT,              -- Имя новой Story
    p_story_description TEXT,       -- Описание новой Story
    p_project_id INT,               -- ID родительского Project
    p_customer_id INT,              -- ID родительского Customer
    p_epic_id INT,                  -- ID родительского Epic
    p_action_description TEXT,      -- Описание действия для логирования
    p_user_id INT,                  -- ID пользователя
    p_next_id INT DEFAULT NULL      -- ID следующего элемента, на который будет ссылаться новая Story
    */
   const actionDescription = "Create story";
      const params = [
        data.name,
        data.description,
        paths.projectId,
        paths.customerId,
        paths.epicId,
        actionDescription,
        byUserId,
        data.nextId
      ];
      console.log("params",params)
      const rows = await dbQuery(QUERIES.CREATE_STORY, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
}

module.exports = new EpicService();
