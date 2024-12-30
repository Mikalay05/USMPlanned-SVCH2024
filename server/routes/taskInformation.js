const taskInformationRouter = require("express").Router();
const taskInformationController = require("../controllers/TaskInformationController");

//Возращает данные о task согласно первичному ключу
taskInformationRouter.get(`/`, taskInformationController.getTaskById);

// Обновляет данные для текущего task
taskInformationRouter.put("/", taskInformationController.updateTaskData);

//Удаляет текущий task
taskInformationRouter.delete("/", taskInformationController.deleteTaskById);

module.exports = taskInformationRouter;
