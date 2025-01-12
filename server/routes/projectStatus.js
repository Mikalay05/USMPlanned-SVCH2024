const projectStatusRouter = require('express').Router();
const projectStatusController = require('../controllers/ProjectStatusController');
const authMiddleware = require('../middleware/AuthMiddleware')

const pk =  "projectStatusId";
//Получить все существующие статусы проектов
projectStatusRouter.get(`/`, authMiddleware, projectStatusController.getAllProjectStatuses);
//Получить конкретный статус проекта по первичному ключу
projectStatusRouter.get(`/:${pk}`, authMiddleware,projectStatusController.getByIdProjectStatus);

module.exports = projectStatusRouter;