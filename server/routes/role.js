const roleRouter = require('express').Router();
const roleController = require('../controllers/RoleController');
const authMiddleware = require('../middleware/AuthMiddleware')

const pk =  roleController.Settings_PKNameInRequest;
// Получить все существующие роли
roleRouter.get(`/`, authMiddleware, roleController.getAllRoles);
//Получить конкрутную роль по id
roleRouter.get(`/:${pk}`,authMiddleware, roleController.getRoleById);

module.exports = roleRouter;