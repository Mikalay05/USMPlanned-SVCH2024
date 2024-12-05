const userRouter = require('express').Router();
const userController = require('../controllers/UserController');


const pk =  userController.Settings_PKNameInRequest;
userRouter.get("/", userController.getAllRequest);
userRouter.get(`/:${pk}`, userController.getDataRequest);
userRouter.post("/", userController.createRequest);
userRouter.post(`/:${pk}`, userController.updateRequest);
userRouter.delete(`/:${pk}`, userController.deleteRequest);



module.exports = userRouter;