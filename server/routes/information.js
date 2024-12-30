const informationRouter = require("express").Router();

const PROJECT_ID_NAME = "projectId";
const projectInformation = require('./projectInformation');
informationRouter.use(`:${PROJECT_ID_NAME}`, projectInformation);

module.exports = informationRouter;
