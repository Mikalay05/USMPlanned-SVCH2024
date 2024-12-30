import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class RoleService extends BaseService {

    async getAllRoles() {
        const response = await BaseService.request("get",API_ENDPOINTS.ROLE.GET_ALL_ROLES);
        return response;
    }
}

const roleStatusServiceInstance = new RoleService();

export default roleStatusServiceInstance;