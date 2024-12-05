const roleRouter = require('express').Router();
const roleController = require('../controllers/RoleController');

const pk =  roleController.Settings_PKNameInRequest;
roleRouter.get("/", roleController.getAllRequest);
roleRouter.get(`/:${pk}`, roleController.getDataRequest);
roleRouter.post("/", roleController.createRequest);
roleRouter.post(`/:${pk}`, roleController.updateRequest);
roleRouter.delete(`/:${pk}`, roleController.deleteRequest);

module.exports = roleRouter;