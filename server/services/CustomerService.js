const ApiError = require("../error/ApiError");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { Customer } = require("../models/models");

class CustomerService {
  async getCustomerActionById(customerId) {
    try {
      const params = [customerId];
      const rows = await dbQuery(QUERIES.GET_CUSTOMER_ACTIONS_BY_ID, params);
      const actions = rows[0].get_customer_actions; // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
  async getChainForSelect(customerId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "get_chain_of_epics_for_customer";
    try {
      const params = [customerId];
      const rows = await dbQuery(
        QUERIES.GET_CHAIN_OF_EPICS_FOR_CUSTOMER,
        params
      );
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
  async getCustomerDataById(customerId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "process_customer";
    try {
      const params = [customerId];
      const rows = await dbQuery(QUERIES.GET_CUSTOMER_DATA_BY_ID, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
  async updateEpicsOrder(epicId, nextEpicId, customerId, projectId, userIdFromToken) {
    try {
      if(!epicId) {
        throw ApiError.badRequest("Epic id is request", {epicIdErr: "Epic id is request"})
      }
      if(!nextEpicId) {
        throw ApiError.badRequest("Next epic id is request", {nextEpicIdErr: "Next epic id is request"})
      }
      const params = [epicId, nextEpicId, customerId, projectId, userIdFromToken];
      const result = await dbQuery(QUERIES.REOREDR_EPICS, params);
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
  createEpic = async(paths, data, userId) => {
    try {
     
      const params = [
        data.name,
        paths.customerId,
        paths.projectId,
        "Create epic",
        userId,
        data.nextId
      ];
      console.log("params",params)
      const result = await dbQuery(QUERIES.CREATE_EPIC, params);
      return result;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    }
  }
}

module.exports = new CustomerService();
