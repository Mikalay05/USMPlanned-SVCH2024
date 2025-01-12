const storyInformationRouter = require("express").Router();
const storyInformationController = require("../controllers/StoryInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о story согласно первичному ключу
storyInformationRouter.get(`/`,authMiddleware, storyInformationController.getStoryById);

//Создает дочерний элемент (task) для текущего story
storyInformationRouter.post(`/`,authMiddleware, storyInformationController.createTaskForStory);

// Обновляет данные для текущего story
storyInformationRouter.put(`/`, authMiddleware, storyInformationController.updateStoryData);

// Обновляет порядок дочерних элементов (task) для текущего story
storyInformationRouter.patch(`/`, authMiddleware, storyInformationController.updateTasksOrder);

//Удаляет текущий story
storyInformationRouter.delete(`/`, authMiddleware, storyInformationController.deleteStoryById);

// Подключаем зависимый маршрут story к пути
const TASK_ID_NAME = "taskId";
const taskInformation = require("./taskInformation");
storyInformationRouter.use(`:${TASK_ID_NAME}`, taskInformation);

module.exports = storyInformationRouter;
