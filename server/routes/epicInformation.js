const express = require("express");
const epicInformationRouter  = express.Router({ mergeParams: true });
const epicInformationController = require("../controllers/EpicInformationController");
const authMiddleware = require('../middleware/AuthMiddleware')
// // Middleware для логирования данных запроса
// epicInformationRouter.use((req, res, next) => {
//     console.log("EPIC Request Info:");
//     console.log("Method:", req.method); // Метод запроса (GET, POST, и т.д.)
//     console.log("URL:", req.originalUrl); // Полный URL запроса
//     console.log("Params:", req.params); // Параметры маршрута
//     console.log("Query:", req.query); // Параметры строки запроса
//     console.log("Body:", req.body); // Тело запроса, если есть (для POST, PUT и т.д.)
  
//     next(); // Передаем управление следующему middleware или обработчику
//   });

//Возращает данные о epic согласно первичному ключу
epicInformationRouter.get(`/data`, authMiddleware, epicInformationController.getEpicById);
// Возвращает данные о epic (действия) согласно первичному ключу
epicInformationRouter.get(`/actions`, authMiddleware, epicInformationController.getEpicActionById);
epicInformationRouter.get('/getChainForSelect', authMiddleware, epicInformationController.getChainForSelect);

//Создает дочерний элемент (story) для текущего epic
epicInformationRouter.post(`/`, authMiddleware, epicInformationController.createStoryForEpic);

// Обновляет данные для текущего epic
epicInformationRouter.put("/", authMiddleware, epicInformationController.updateEpicData);

// Обновляет порядок дочерних элементов (story) для текущего epic
epicInformationRouter.patch("/", authMiddleware, epicInformationController.updateStoriesOrder);

//Удаляет текущий epic
epicInformationRouter.delete("/", authMiddleware, epicInformationController.deleteEpicById);

// Подключаем зависимый маршрут story к пути
const STORY_ID_NAME = "storyId";
const storyInformation = require("./storyInformation");
epicInformationRouter.use(`/:${STORY_ID_NAME}`, storyInformation);

module.exports = epicInformationRouter;
