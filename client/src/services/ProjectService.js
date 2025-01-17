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
        const response = await BaseService.request("get", endpoint);
        return response;
    }
    async deleteProject(projectId) {
        const endpoint = API_ENDPOINTS.PROJECT.DELETE_PROJECT.replace(':projectId', projectId);
        const response = await BaseService.request("delete", endpoint);
        return response;
    }
    async updateProject(projectId, dataForm) {
        const endpoint = API_ENDPOINTS.PROJECT.UPDATE_PROJECT_DATA.replace(':projectId', projectId);
        const response = await BaseService.request("put", endpoint);
        return response;
    }
}

const projectServiceInstance = new ProjectService();

export default projectServiceInstance;