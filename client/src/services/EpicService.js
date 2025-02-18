import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";
const replaceParamsInUrl = (path, params) => {
  return path
    .replace(":projectId", params.projectId)
    .replace(":customerId", params.customerId)
    .replace(":epicId", params.epicId);
};
class EpicService extends BaseService {
  async getEpicActions(paths) {
    const endpoint = replaceParamsInUrl(
      API_ENDPOINTS.EPIC.GET_EPIC_ACTIONS_BY_ID,
      paths
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getCurrentEpic(paths) {
    const endpoint = replaceParamsInUrl(
      API_ENDPOINTS.EPIC.GET_EPIC_DATA_BY_ID,
      paths
    );

    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getChainForSelectionInTheEpic(paths) {

    const endpoint = replaceParamsInUrl(
      API_ENDPOINTS.EPIC.GET_CHAIN_FOR_SELECT,
      paths
    );
    alert(endpoint)
    const response = await BaseService.request("get", endpoint);
    console.log(response)
    alert("result")
    return response;
  }
}

const epicServiceInstance = new EpicService();

export default epicServiceInstance;
