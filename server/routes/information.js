const express = require("express");

const informationRouter = express.Router({ mergeParams: true });
const projectInformation = require('./projectInformation');

// Middleware для логирования параметров
informationRouter.use('/:projectId', (req, res, next) => {
    console.log(`[INFORMATION] Params:`, req.params);
    next(); // Обязательно вызываем next(), чтобы передать управление дальше
});

// Подключение projectInformationRouter к информации
informationRouter.use('/:projectId', projectInformation);

module.exports = informationRouter;