const projectInformationRouter = require("express").Router();
const projectInformationController = require("../controllers/ProjectInformationController");

//Возращает данные о проекте согласно первичному ключу
projectInformationRouter.get(`/`, projectInformationController);

//Создает дочерний элемент (customer) для текущего проекта
projectInformationRouter.post(`/`, projectInformationController);

//Обновляет порядок дочерних элементов (customer) для текущего проекта
projectInformationRouter.put(`/`, projectInformationController);

//Удаляет текущий проект проект
projectInformationRouter.delete("/", projectInformationController);

// Подключаем зависимый маршрут customer к пути
const CUSTOMER_ID_NAME = "customerId";
const customerInformation = require('./customerInformation');
projectInformationRouter.use(`:${CUSTOMER_ID_NAME}`, customerInformation);

module.exports = projectInformationRouter;
