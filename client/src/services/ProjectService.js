import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class ProjectService extends BaseService {
    async getProjects(){
        const response = await BaseService.request("get", API_ENDPOINTS.PROJECT.GET_PROJECTS);

        return response;
    }

    
    async createProject(data) {
        const response = await BaseService.request("post",API_ENDPOINTS.PROJECT.CREATE_PROJECT, data);
        return response;
    }
}

const projectServiceInstance = new ProjectService();

export default projectServiceInstance;