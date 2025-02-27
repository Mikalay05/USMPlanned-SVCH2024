import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";
const replaceParamsInUrl = (path, params) => {
  const result = path
    .replace(":projectId", params.projectId)
    .replace(":customerId", params.customerId)
    .replace(":epicId", params.epicId)
    .replace(":storyId", params.storyId);
  return result;
};
class StoryService extends BaseService {
  async getStoryActions(storyId) {
    const endpoint = API_ENDPOINTS.STORY.GET_STORY_ACTIONS_BY_ID.replace(
      ":storyId",
      storyId
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getCurrentStory({ paths }) {
    const endpoint = replaceParamsInUrl(
      API_ENDPOINTS.STORY.GET_STORY_DATA_BY_ID,
      paths
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
  async getChainForSelectionInTheStory(paths) {
    const endpoint = replaceParamsInUrl(
      API_ENDPOINTS.STORY.GET_CHAIN_FOR_SELECT,
      paths
    );
    const response = await BaseService.request("get", endpoint);
    return response;
  }
}

const storyServiceInstance = new StoryService();

export default storyServiceInstance;
