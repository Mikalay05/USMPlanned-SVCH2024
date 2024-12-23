import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class ProjectStatusService extends BaseService {

    async getProjectStatuses() {
        const response = await BaseService.request("get",API_ENDPOINTS.PROJECT_STATUS.GET_ALL_PROJECT_STATUSES);
        return response;
    }
}

const projectServiceInstance = new ProjectStatusService();

export default projectServiceInstance;