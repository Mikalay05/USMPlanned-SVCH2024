const epicInformationRouter = require("express").Router();
const epicInformationController = require("../controllers/EpicInformationController");

//Возращает данные о epic согласно первичному ключу
epicInformationRouter.get(`/`, epicInformationController);

//Создает дочерний элемент (story) для текущего проекта
epicInformationRouter.post(`/`, epicInformationController);

//Обновляет порядок дочерних элементов (story) для текущего проекта
epicInformationRouter.put(`/`, epicInformationController);

//Удаляет текущий epic
epicInformationRouter.delete("/", epicInformationController);

// Подключаем зависимый маршрут story к пути
const STORY_ID_NAME = "storyId";
const storyInformation = require("./storyInformation");
epicInformationRouter.use(`:${STORY_ID_NAME}`, storyInformation);

module.exports = epicInformationRouter;
