const storyInformationRouter = require("express").Router();
const storyInformationController = require("../controllers/StoryInformationController");

//Возращает данные о story согласно первичному ключу
storyInformationRouter.get(`/`, storyInformationController);

//Создает дочерний элемент (task) для текущего проекта
storyInformationRouter.post(`/`, storyInformationController);

//Обновляет порядок дочерних элементов (task) для текущего проекта
storyInformationRouter.put(`/`, storyInformationController);

//Удаляет текущий story
storyInformationRouter.delete("/", storyInformationController);

// Подключаем зависимый маршрут story к пути
const TASK_ID_NAME = "taskId";
const taskInformation = require("./taskInformation");
storyInformationRouter.use(`:${TASK_ID_NAME}`, taskInformation);

module.exports = storyInformationRouter;
