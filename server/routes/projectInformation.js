const projectInformationRouter = require("express").Router();
const projectInformationController = require("../controllers/ProjectInformationController");

// Возвращает данные о проекте согласно первичному ключу
projectInformationRouter.get(`/`, projectInformationController.getProjectById);

// Создает дочерний элемент (customer) для текущего проекта
projectInformationRouter.post(`/`, projectInformationController.createCustomerForProject);

// Обновляет данные для текущего проекта
projectInformationRouter.put("/", projectInformationController.updateProjectData);

// Обновляет порядок дочерних элементов (customer) для текущего проекта
projectInformationRouter.patch("/", projectInformationController.updateCustomersOrder);

// Удаляет текущий проект
projectInformationRouter.delete("/", projectInformationController.deleteProjectById);

// Подключаем зависимый маршрут customer к пути
const CUSTOMER_ID_NAME = "customerId";
const customerInformation = require('./customerInformation');
projectInformationRouter.use(`:${CUSTOMER_ID_NAME}`, customerInformation);

module.exports = projectInformationRouter;
