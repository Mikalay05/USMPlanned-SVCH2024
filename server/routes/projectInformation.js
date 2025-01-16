const projectInformationRouter = require("express").Router();
const projectInformationController = require("../controllers/ProjectInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

const pk = projectInformationController.PROJECT_ID_PROPERTY;

// Возвращает данные о проекте согласно первичному ключу
projectInformationRouter.get(`/:${pk}`, authMiddleware, projectInformationController.getProjectById);

// Создает дочерний элемент (customer) для текущего проекта
projectInformationRouter.post(`/`, authMiddleware, projectInformationController.createCustomerForProject);

// Обновляет данные для текущего проекта
projectInformationRouter.put(`/`, authMiddleware, projectInformationController.updateProjectData);

// Обновляет порядок дочерних элементов (customer) для текущего проекта
projectInformationRouter.patch(`/`, authMiddleware, projectInformationController.updateCustomersOrder);

// Удаляет текущий проект
projectInformationRouter.delete(`/`, authMiddleware, projectInformationController.deleteProjectById);

// Подключаем зависимый маршрут customer к пути
const CUSTOMER_ID_NAME = "customerId";
const customerInformation = require('./customerInformation');
projectInformationRouter.use(`:${CUSTOMER_ID_NAME}`, customerInformation);

module.exports = projectInformationRouter;
