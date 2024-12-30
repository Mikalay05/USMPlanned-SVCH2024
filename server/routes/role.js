const roleRouter = require('express').Router();
const roleController = require('../controllers/RoleController');

const pk =  roleController.Settings_PKNameInRequest;
// Получить все существующие роли
roleRouter.get("/", roleController.getAllRoles);
//Получить конкрутную роль по id
roleRouter.get(`/:${pk}`, roleController.getRoleById);

module.exports = roleRouter;