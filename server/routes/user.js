const userRouter = require('express').Router();
const userController = require('../controllers/UserController');

userRouter.get("/", userController.getAllRequest);
userRouter.get(`/:${userController.userIdNameInRequest}`, userController.getDataRequest);
userRouter.post("/", userController.);
userRouter.post(`/:${userController.userIdNameInRequest}`, userController.);
userRouter.delete("/", userController.);



module.exports = userRouter;