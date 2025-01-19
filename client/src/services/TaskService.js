
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class TaskService extends BaseService {
        async getTaskActions(taskId) {
            const endpoint = API_ENDPOINTS.TASK.GET_TASK_ACTIONS_BY_ID.replace(':taskId', taskId);
            const response = await BaseService.request("get", endpoint);
            return response;
        }
}

const taskServiceInstance = new TaskService();

export default taskServiceInstance;