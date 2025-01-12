const epicInformationRouter = require("express").Router();
const epicInformationController = require("../controllers/EpicInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о epic согласно первичному ключу
epicInformationRouter.get(`/`, authMiddleware, epicInformationController.getEpicById);

//Создает дочерний элемент (story) для текущего epic
epicInformationRouter.post(`/`, authMiddleware, epicInformationController.createStoryForEpic);

// Обновляет данные для текущего epic
epicInformationRouter.put("/", authMiddleware, epicInformationController.updateEpicData);

// Обновляет порядок дочерних элементов (story) для текущего epic
epicInformationRouter.patch("/", authMiddleware, epicInformationController.updateStoriesOrder);

//Удаляет текущий epic
epicInformationRouter.delete("/", authMiddleware, epicInformationController.deleteEpicById);

// Подключаем зависимый маршрут story к пути
const STORY_ID_NAME = "storyId";
const storyInformation = require("./storyInformation");
epicInformationRouter.use(`:${STORY_ID_NAME}`, storyInformation);

module.exports = epicInformationRouter;
