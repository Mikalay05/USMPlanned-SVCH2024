import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class UserService extends BaseService {

    async getAllUsers() {
        const response = await BaseService.request("get",API_ENDPOINTS.USER.GET_ALL_USERS);
        return response;
    }
}

export default new UserService();