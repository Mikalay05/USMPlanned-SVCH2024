import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";
const replaceParamsInUrl = (path, params) => {
  return path
    .replace(":projectId", params.projectId)
    .replace(":customerId", params.customerId);
};
class CustomerService extends BaseService {
  async getCustomerActions(customerId) {

    const endpoint = API_ENDPOINTS.CUSTOMER.GET_CUSTOMER_ACTIONS_BY_ID.replace(
      ":customerId",
      customerId
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getCurrentCustomer(customerId) {
    const endpoint = API_ENDPOINTS.CUSTOMER.GET_CUSTOMER_DATA_BY_ID.replace(
      ":customerId",
      customerId
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getChainForSelectionInTheCustomer(customerId) {
    const endpoint = API_ENDPOINTS.CUSTOMER.GET_CHAIN_FOR_SELECT.replace(
      ":customerId",
      customerId
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async createEpic(paths, dataForCreate) {
    const endpoint = replaceParamsInUrl(API_ENDPOINTS.CUSTOMER.CREATE_EPIC, paths);
    const response = await BaseService.request("post", endpoint, dataForCreate);
    return response;
  }
  
  async reorderEpics(paths, data) {
    const endpoint = API_ENDPOINTS.CUSTOMER.REORDER_EPICS
    .replace(
      ":projectId",
      paths.projectId
    )
    .replace(
      ":customerId",
      paths.customerId
    );
    const response = await BaseService.request("patch", endpoint, data);
    return response;
  }
}

const customerServicenstance = new CustomerService();

export default customerServicenstance;
