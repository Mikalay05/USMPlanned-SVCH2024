const customerInformationRouter = require("express").Router();
const customerInformationController = require("../controllers/CustomerInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о customer согласно первичному ключу
customerInformationRouter.get(`/`, authMiddleware, customerInformationController.getCustomerById);

//Создает дочерний элемент (epic) для текущего customer
customerInformationRouter.post(`/`, authMiddleware, customerInformationController.createEpicForCustomer);

// Обновляет данные для текущего customer
customerInformationRouter.put("/", authMiddleware, customerInformationController.updateCustomerData);

// Обновляет порядок дочерних элементов (epic) для текущего customer
customerInformationRouter.patch("/", authMiddleware, customerInformationController.updateEpicsOrder);

//Удаляет текущий customer
customerInformationRouter.delete("/", authMiddleware, customerInformationController.deleteCustomerById);

// Подключаем зависимый маршрут epic к пути
const EPIC_ID_NAME = "epicId";
const epicInformation = require("./epicInformation");
customerInformationRouter.use(`:${EPIC_ID_NAME}`, epicInformation);

module.exports = customerInformationRouter;
