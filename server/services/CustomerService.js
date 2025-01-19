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
}

module.exports = new CustomerService();
