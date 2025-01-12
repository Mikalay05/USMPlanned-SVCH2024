import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class UserService extends BaseService {

    async getAllUsers() {
        const response = await BaseService.request("get",API_ENDPOINTS.USER.GET_ALL_USERS);
        return response;
    }
    async registrationUser({name, surname,patronymic, email, phone, role }) {
        const response = await BaseService.request("post", API_ENDPOINTS.USER.REGISTRATION_USER, {name, surname,patronymic, email, phone,role });
        return response
    }
    async loginUser({login, password}) {
        const response = await BaseService.request("post", API_ENDPOINTS.USER.LOGIN_USER, {login, password });
        return response;
    }
    async getCurrenUserData() {
        const response = await BaseService.request("get", API_ENDPOINTS.USER.GET_CURRENT_USER_DATA);
        return response;
    }
}

export default new UserService();