const express = require("express");
const taskInformationRouter  = express.Router({ mergeParams: true });
const taskInformationController = require("../controllers/TaskInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о task согласно первичному ключу
taskInformationRouter.get(`/`,authMiddleware,taskInformationController.getTaskById);
// Возвращает данные о task (действия) согласно первичному ключу
taskInformationRouter.get(`/actions`, authMiddleware, taskInformationController.getTaskActionById);

// Обновляет данные для текущего task
taskInformationRouter.put(`/`, authMiddleware, taskInformationController.updateTaskData);

//Удаляет текущий task
taskInformationRouter.delete(`/`, authMiddleware, taskInformationController.deleteTaskById);

module.exports = taskInformationRouter;
