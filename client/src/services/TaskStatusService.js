
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class TaskService extends BaseService {
        async getTaskStatuses(taskId) {
            const endpoint = API_ENDPOINTS.TASK_STATUS.GET_TASK_STATUS;
            const response = await BaseService.request("get", endpoint);
            return response;
        }
}

const taskServiceInstance = new TaskService();

export default taskServiceInstance;