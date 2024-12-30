const taskInformationRouter = require("express").Router();
const taskInformationController = require("../controllers/TaskInformationController");

//Возращает данные о task согласно первичному ключу
taskInformationRouter.get(`/`, taskInformationController);

//Удаляет текущий task
taskInformationRouter.delete("/", taskInformationController);

module.exports = taskInformationRouter;
