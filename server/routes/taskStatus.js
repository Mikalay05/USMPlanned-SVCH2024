const taskStatusRouter = require('express').Router();
const taskStatusController = require('../controllers/TaskStatusController');

const pk =  "taskStatusId";
//Получить все существующие статусы проектов
taskStatusRouter.get(`/`, taskStatusController.getAllTaskStatuses);
//Получить конкретный статус проекта по первичному ключу
taskStatusRouter.get(`/:${pk}`,taskStatusController.getByPkTaskStatus);

module.exports = taskStatusRouter;