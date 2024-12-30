const projectStatusRouter = require('express').Router();
const projectStatusController = require('../controllers/ProjectStatusController');

const pk =  "projectStatusId";
//Получить все существующие статусы проектов
projectStatusRouter.get("/", projectStatusController.getAllProjectStatuses);
//Получить конкретный статус проекта по первичному ключу
projectStatusRouter.get(`/:${pk}`, projectStatusController.getByIdProjectStatus);

module.exports = projectStatusRouter;