const roleRouter = require('express').Router();
const roleController = require('../controllers/RoleController');

const pk =  roleController.Settings_PKNameInRequest;
//Получить все существующие роли
roleRouter.get("/", roleController.getAllRequest);
//Получить конкрутную роль по id
roleRouter.get(`/:${pk}`, roleController.getDataRequest);

module.exports = roleRouter;