const informationRouter = require('express').Router();
const informationController = require('../controllers/InformationController');

const PROJECT_ID_NAME = "projectId";
const CUSTOMER_ID_NAME = "customerId";
const EPIC_ID_NAME = "epicId";
const STORY_ID_NAME = "storyId";
const TASK_ID_NAME = "taskId";

// Используем опциональные параметры с ? в пути
informationRouter.get(
    `/:${PROJECT_ID_NAME}/:customerId?/:epicId?/:storyId?/:taskId?`, 
    informationController.getRequest
  );
  
module.exports = informationRouter;
