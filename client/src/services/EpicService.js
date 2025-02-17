import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class EpicService extends BaseService {
  async getEpicActions(paths) {
    const endpoint = API_ENDPOINTS.EPIC.GET_EPIC_ACTIONS_BY_ID.replace(
      ":projectId",
      paths.projectId
    )
      .replace(":customerId", paths.customerId)
      .replace(":epicId", paths.epicId);
      alert(endpoint)
    const response = await BaseService.request("get", endpoint);
    return response;
  }
}

const epicServiceInstance = new EpicService();

export default epicServiceInstance;
