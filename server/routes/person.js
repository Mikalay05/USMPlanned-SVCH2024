const personRouter = require('express').Router();
const personController = require('../controllers/PersonController');

const pk =  personController.Settings_PKNameInRequest;
personRouter.get("/", personController.getAllRequest);
personRouter.get(`/:${pk}`, personController.getDataRequest);
personRouter.post("/", personController.createRequest);
personRouter.put(`/:${pk}`, personController.updateRequest);
personRouter.delete(`/:${pk}`, personController.deleteRequest);

module.exports = personRouter;