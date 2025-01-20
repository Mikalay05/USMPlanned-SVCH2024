const express = require("express");
const projectInformationRouter = express.Router({ mergeParams: true });
const projectInformationController = require("../controllers/ProjectInformationController");
const authMiddleware = require('../middleware/AuthMiddleware');

// Middleware для логирования данных запроса
projectInformationRouter.use((req, res, next) => {
    console.log("Request Info:");
    console.log("Method:", req.method); // Метод запроса (GET, POST, и т.д.)
    console.log("URL:", req.originalUrl); // Полный URL запроса
    console.log("Params:", req.params); // Параметры маршрута
    console.log("Query:", req.query); // Параметры строки запроса
    console.log("Body:", req.body); // Тело запроса, если есть (для POST, PUT и т.д.)
  
    next(); // Передаем управление следующему middleware или обработчику
  });

// Возвращает данные о проекте (действия) согласно первичному ключу
projectInformationRouter.get('/actions', authMiddleware, projectInformationController.getProjectActionById);
projectInformationRouter.get('/data', authMiddleware, projectInformationController.getProjectDataById);
projectInformationRouter.get('/getChainForSelect', authMiddleware, projectInformationController.getChainForSelect);

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