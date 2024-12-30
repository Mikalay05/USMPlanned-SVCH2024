const customerInformationRouter = require("express").Router();
const customerInformationController = require("../controllers/CustomerInformationController");

//Возращает данные о customer согласно первичному ключу
customerInformationRouter.get(`/`, customerInformationController);

//Создает дочерний элемент (epic) для текущего проекта
customerInformationRouter.post(`/`, customerInformationController);

//Обновляет порядок дочерних элементов (epic) для текущего проекта
customerInformationRouter.put(`/`, customerInformationController);

//Удаляет текущий customer
customerInformationRouter.delete("/", customerInformationController);

// Подключаем зависимый маршрут epic к пути
const EPIC_ID_NAME = "epicId";
const epicInformation = require("./epicInformation");
customerInformationRouter.use(`:${EPIC_ID_NAME}`, epicInformation);

module.exports = customerInformationRouter;
