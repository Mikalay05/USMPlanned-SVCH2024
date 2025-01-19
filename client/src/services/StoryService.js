
import $api from "../http/index";
import { API_ENDPOINTS } from "../http/apiEnpoints";
import BaseService from "./BaseService";

class StoryService extends BaseService {
        async getStoryActions(storyId) {
            const endpoint = API_ENDPOINTS.STORY.GET_STORY_ACTIONS_BY_ID.replace(':storyId', storyId);
            const response = await BaseService.request("get", endpoint);
            return response;
        }
}

const storyServiceInstance = new StoryService();

export default storyServiceInstance;