const customerInformationRouter = require("express").Router();
const customerInformationController = require("../controllers/CustomerInformationController");

//Возращает данные о customer согласно первичному ключу
customerInformationRouter.get(`/`, customerInformationController.getCustomerById);

//Создает дочерний элемент (epic) для текущего customer
customerInformationRouter.post(`/`, customerInformationController.createEpicForCustomer);

// Обновляет данные для текущего customer
customerInformationRouter.put("/", customerInformationController.updateCustomerData);

// Обновляет порядок дочерних элементов (epic) для текущего customer
customerInformationRouter.patch("/", customerInformationController.updateEpicsOrder);

//Удаляет текущий customer
customerInformationRouter.delete("/", customerInformationController.deleteCustomerById);

// Подключаем зависимый маршрут epic к пути
const EPIC_ID_NAME = "epicId";
const epicInformation = require("./epicInformation");
customerInformationRouter.use(`:${EPIC_ID_NAME}`, epicInformation);

module.exports = customerInformationRouter;
