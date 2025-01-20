const express = require("express");
const customerInformationRouter = express.Router({ mergeParams: true });
const customerInformationController = require("../controllers/CustomerInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')

//Возращает данные о customer согласно первичному ключу
customerInformationRouter.get(`/data`, authMiddleware, customerInformationController.getCustomerDataById);
// Возвращает данные о customer (действия) согласно первичному ключу
customerInformationRouter.get(`/actions`, authMiddleware, customerInformationController.getCustomerActionById);
customerInformationRouter.get('/getChainForSelect', authMiddleware, customerInformationController.getChainForSelect);

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
customerInformationRouter.use(`/:${EPIC_ID_NAME}`, epicInformation);

module.exports = customerInformationRouter;
