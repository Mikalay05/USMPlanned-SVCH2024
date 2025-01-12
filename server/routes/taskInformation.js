const taskInformationRouter = require("express").Router();
const taskInformationController = require("../controllers/TaskInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о task согласно первичному ключу
taskInformationRouter.get(`/`,authMiddleware,taskInformationController.getTaskById);

// Обновляет данные для текущего task
taskInformationRouter.put(`/`, authMiddleware, taskInformationController.updateTaskData);

//Удаляет текущий task
taskInformationRouter.delete(`/`, authMiddleware, taskInformationController.deleteTaskById);

module.exports = taskInformationRouter;
