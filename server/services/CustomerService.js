const ApiError = require("../error/ApiError");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { Customer } = require('../models/models');


class CustomerService {

  async getCustomerActionById(customerId) {
    try {
      const params = [customerId];
      const rows = await dbQuery(QUERIES.GET_CUSTOMER_ACTIONS_BY_ID, params);
      const actions = rows[0].get_customer_actions;  // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка получения actions для customer", {
        customerId,
        error: err.message
      });
    }
  }
  async getChainForSelect(customerId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "get_chain_of_epics_for_customer";
    try {
      const params = [customerId];
      const rows = await dbQuery(QUERIES.GET_CHAIN_OF_EPICS_FOR_CUSTOMER, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectByIdError, {
        projectId,
        error: err.message
      });
    }
  }

}

module.exports = new CustomerService();
