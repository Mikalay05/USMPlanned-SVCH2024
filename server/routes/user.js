const userRouter = require('express').Router();
const userController = require('../controllers/UserController');

userRouter.get("/", userController.getAllRequest);
userRouter.get(`/:${userController.userLoginNameInRequest}`, userController.getDataRequest);
userRouter.post("/", userController.createRequest);
// userRouter.post(`/:${userController.userLoginNameInRequest}`, userController.);
userRouter.delete(`/:${userController.userLoginNameInRequest}`, userController.deleteRequest);



module.exports = userRouter;