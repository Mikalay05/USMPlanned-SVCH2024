import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

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
}

const customerServicenstance = new CustomerService();

export default customerServicenstance;
