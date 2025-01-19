const express = require("express");
const storyInformationRouter = express.Router({ mergeParams: true });
const storyInformationController = require("../controllers/StoryInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

storyInformationRouter.use((req, res, next) => {
    console.log("STORY Request Info:");
    console.log("Method:", req.method); // Метод запроса (GET, POST, и т.д.)
    console.log("URL:", req.originalUrl); // Полный URL запроса
    console.log("Params:", req.params); // Параметры маршрута
    console.log("Query:", req.query); // Параметры строки запроса
    console.log("Body:", req.body); // Тело запроса, если есть (для POST, PUT и т.д.)
  
    next(); // Передаем управление следующему middleware или обработчику
  });


//Возращает данные о story согласно первичному ключу
storyInformationRouter.get(`/`,authMiddleware, storyInformationController.getStoryById);
// Возвращает данные о story (действия) согласно первичному ключу
storyInformationRouter.get(`/actions`, authMiddleware, storyInformationController.getStoryActionById);

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
storyInformationRouter.use(`/:${TASK_ID_NAME}`, taskInformation);

module.exports = storyInformationRouter;
