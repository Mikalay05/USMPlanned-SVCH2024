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
    async getProjectById(projectId) {
        const endpoint = API_ENDPOINTS.PROJECT.GET_PROJECT_BY_ID.replace(':projectId', projectId);
        console.log('projectId',projectId)
        console.log('endpoint',endpoint)
        const response = await BaseService.request("get", endpoint);
        return response;
    }
}

const projectServiceInstance = new ProjectService();

export default projectServiceInstance;