const projectStatusRouter = require('express').Router();
const projectStatusController = require('../controllers/ProjectStatusController');

const pk =  "projectStatusId";
projectStatusRouter.get("/", projectStatusController.getAllProjectStatuses);
projectStatusRouter.get(`/:${pk}`, projectStatusController.getByIdProjectStatus);

module.exports = projectStatusRouter;