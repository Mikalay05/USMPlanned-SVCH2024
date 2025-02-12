const CustomerService = require("../services/CustomerService");
const CustomerActionsDto = require("../DTOs/Data/Actions/CustomerActionsDto");
const ChainForSelectionInTheCustomer = require("../DTOs/Data/ChainForSelect/ChainForSelectionInTheCustomer");
const InformationCustomerDto = require("../DTOs/Data/Information/InformationCustomerDto");
const EpicsOrderUpdateDto = require("../DTOs/ForUpdate/EpicsOrderUpdateDto");
const EpicForCreationDTO = require("../DTOs/ForCreation/EpicForCreationDTO");

class CustomerInformationController {
  constructor(
    projectIdProperty = "projectId",
    customerIdProperty = "customerId",
    epicIdProperty = "epicId"
  ) {
    this.PROJECT_ID_PROPERTY = projectIdProperty;
    this.CUSTOMER_ID_PROPERTY = customerIdProperty;
  }
  getParamsIdFromReq = (req) => {
    const projectId = req.params[this.PROJECT_ID_PROPERTY];
    const customerId = req.params[this.CUSTOMER_ID_PROPERTY];
    return { customerId, projectId };
  };
  getCustomerDataById = async (req, res, next) => {
    try {
      const { customerId } = this.getParamsIdFromReq(req);
      const data = await CustomerService.getCustomerDataById(customerId);
      console.log(data);
      const resultDto = new InformationCustomerDto(data);
      return res.status(200).json(resultDto);
    } catch (err) {
      console.log("Error in getCustomerDataById:", err);
      next(err);
    }
  };

  getCustomerActionById = async (req, res, next) => {
    try {
      // Получаем projectId из параметров
      const { customerId } = this.getParamsIdFromReq(req);
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
      const {userIdFromToken} = req;
      const dataDto = new EpicForCreationDTO(req.body.dataForCreation);
      const {projectId, customerId} = this.getParamsIdFromReq();

      const result = await CustomerService.createEpic();

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

  updateEpicsOrder = async (req, res, next) => {
    try {
      const { projectId, customerId } = this.getParamsIdFromReq(req);
      const { userIdFromToken } = req;
      const dataOfBodyRequest = new EpicsOrderUpdateDto(req.body);
      const resultOfUpdate = await CustomerService.updateEpicsOrder(
        dataOfBodyRequest.epicId,
        dataOfBodyRequest.nextEpicId,
        customerId,
        projectId,
        userIdFromToken
      );
      const newEpicsArr = await this.getChainForSelect(req, res, next);
    } catch (err) {
      console.log("Error in updateEpicsOrder:", err);
      next(err);
    }
  };

  async deleteCustomerById(req, res, next) {
    try {
      //TODO Add a method implementation
      throw new Error("Not implemented");
    } catch (err) {
      console.log("Error in deleteCustomerById:", err);
      next(err);
    }
  }

  getChainForSelect = async (req, res, next) => {
    try {
      const { customerId } = this.getParamsIdFromReq(req);
      const data = await CustomerService.getChainForSelect(customerId);
      // Создаем DTO для результата
      const resultDto = data.map(
        (item) => new ChainForSelectionInTheCustomer(item)
      );
      return res.status(200).json(resultDto);
    } catch (err) {
      console.log("Error in catch", err); // Логирование ошибки
      next(err); // Передаем ошибку дальше
    }
  };
}

module.exports = new CustomerInformationController();
