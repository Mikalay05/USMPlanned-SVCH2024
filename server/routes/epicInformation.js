const epicInformationRouter = require("express").Router();
const epicInformationController = require("../controllers/EpicInformationController");

//Возращает данные о epic согласно первичному ключу
epicInformationRouter.get(`/`, epicInformationController.getEpicById);

//Создает дочерний элемент (story) для текущего epic
epicInformationRouter.post(`/`, epicInformationController.createStoryForEpic);

// Обновляет данные для текущего epic
epicInformationRouter.put("/", epicInformationController.updateEpicData);

// Обновляет порядок дочерних элементов (story) для текущего epic
epicInformationRouter.patch("/", epicInformationController.updateStoriesOrder);

//Удаляет текущий epic
epicInformationRouter.delete("/", epicInformationController.deleteEpicById);

// Подключаем зависимый маршрут story к пути
const STORY_ID_NAME = "storyId";
const storyInformation = require("./storyInformation");
epicInformationRouter.use(`:${STORY_ID_NAME}`, storyInformation);

module.exports = epicInformationRouter;
