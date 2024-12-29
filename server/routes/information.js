const informationRouter = require("express").Router();
const informationController = require("../controllers/InformationController");

const PROJECT_ID_NAME = "projectId";
const CUSTOMER_ID_NAME = "customerId";
const EPIC_ID_NAME = "epicId";
const STORY_ID_NAME = "storyId";
const TASK_ID_NAME = "taskId";

// Используем опциональные параметры с ? в пути
informationRouter.get(
  `/:${PROJECT_ID_NAME}/`,
  informationController.getProjectDataRequest
);

// `/:${PROJECT_ID_NAME}/:${CUSTOMER_ID_NAME}`, informationController.getCustomerDataRequest
// `/:${PROJECT_ID_NAME}/:${CUSTOMER_ID_NAME}/${EPIC_ID_NAME}`, informationController.getEpicDataRequest
// `/:${PROJECT_ID_NAME}/:${CUSTOMER_ID_NAME}/${EPIC_ID_NAME}/${STORY_ID_NAME}`, informationController.getStoryDataRequest
// `/:${PROJECT_ID_NAME}/:${CUSTOMER_ID_NAME}/${EPIC_ID_NAME}/${STORY_ID_NAME}/${TASK_ID_NAME}`, informationController.getTaskDataRequest
module.exports = informationRouter;
