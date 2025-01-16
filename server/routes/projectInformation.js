const express = require("express");
const projectInformationRouter = express.Router({ mergeParams: true });
const projectInformationController = require("../controllers/ProjectInformationController");
const authMiddleware = require('../middleware/AuthMiddleware');

// Middleware для логирования параметров
projectInformationRouter.use((req, res, next) => {
    console.log(`[PROJECT INFORMATION] Params:`, req.params);
    next(); // Обязательно вызываем next(), чтобы передать управление дальше
});

// Возвращает данные о проекте согласно первичному ключу
projectInformationRouter.get('/', authMiddleware, projectInformationController.getProjectById);

// Создает дочерний элемент (customer) для текущего проекта
projectInformationRouter.post('/', authMiddleware, projectInformationController.createCustomerForProject);

// Обновляет данные для текущего проекта
projectInformationRouter.put('/', authMiddleware, projectInformationController.updateProjectData);

// Обновляет порядок дочерних элементов (customer) для текущего проекта
projectInformationRouter.patch('/', authMiddleware, projectInformationController.updateCustomersOrder);

// Удаляет текущий проект
projectInformationRouter.delete('/', authMiddleware, projectInformationController.deleteProjectById);

// Подключаем зависимый маршрут customer к пути
const CUSTOMER_ID_NAME = "customerId";
const customerInformation = require('./customerInformation');
projectInformationRouter.use(`/:${CUSTOMER_ID_NAME}`, customerInformation);

module.exports = projectInformationRouter;