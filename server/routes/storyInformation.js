const storyInformationRouter = require("express").Router();
const storyInformationController = require("../controllers/StoryInformationController");

//Возращает данные о story согласно первичному ключу
storyInformationRouter.get(`/`, storyInformationController.getStoryById);

//Создает дочерний элемент (task) для текущего story
storyInformationRouter.post(`/`, storyInformationController.createTaskForStory);

// Обновляет данные для текущего story
storyInformationRouter.put("/", storyInformationController.updateStoryData);

// Обновляет порядок дочерних элементов (task) для текущего story
storyInformationRouter.patch("/", storyInformationController.updateTasksOrder);

//Удаляет текущий story
storyInformationRouter.delete("/", storyInformationController.deleteStoryById);

// Подключаем зависимый маршрут story к пути
const TASK_ID_NAME = "taskId";
const taskInformation = require("./taskInformation");
storyInformationRouter.use(`:${TASK_ID_NAME}`, taskInformation);

module.exports = storyInformationRouter;
