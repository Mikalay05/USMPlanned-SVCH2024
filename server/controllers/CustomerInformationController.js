const CustomerService = require('../services/CustomerService')
const CustomerActionsDto = require('../DTOs/Data/Actions/CustomerActionsDto')

class CustomerInformationController {
  constructor(
    projectIdProperty = "projectId",
    customerIdProperty = "customerId",
    epicIdProperty = "epicId"
  ) {
    this.PROJECT_ID_PROPERTY = projectIdProperty;
    this.CUSTOMER_ID_PROPERTY = customerIdProperty;
    this.EPIC_ID_PROPERTY = epicIdProperty;
  }
  async getCustomerById(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in getCustomerById:", err);
      next(err);
    }
  }

  getCustomerIdFromReqParams = (req) => {
    const customerId = req.params[this.CUSTOMER_ID_PROPERTY];
    return customerId;
  };
  getCustomerActionById = async (req, res, next) => {
    try {
      // Получаем projectId из параметров
      const customerId = this.getCustomerIdFromReqParams(req);
      // Получаем данные о проекте
      const data = await CustomerService.getCustomerActionById(customerId);
      // Создаем DTO для результата
      const resultDto = data.map((item) => new CustomerActionsDto(item));

      return res.status(200).json({ customerActions: resultDto });
    } catch (err) {
      console.log("Error in catch", err); // Логирование ошибки
      next(err); // Передаем ошибку дальше
    }
  };
  async createEpicForCustomer(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in createEpicForCustomer:", err);
      next(err);
    }
  }

  async updateCustomerData(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in updateCustomerData:", err);
      next(err);
    }
  }

  async updateEpicsOrder(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in updateEpicsOrder:", err);
      next(err);
    }
  }

  async deleteCustomerById(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in deleteCustomerById:", err);
      next(err);
    }
  }
}

module.exports = new CustomerInformationController();
