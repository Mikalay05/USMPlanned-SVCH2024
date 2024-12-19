const userRouter = require('express').Router();
const userController = require('../controllers/UserController');


const pk =  'login';
userRouter.get("/", userController.getAllRequest);
userRouter.get(`/:${pk}`, userController.getDataRequest);
userRouter.post("/registration", userController.registrationRequire);
userRouter.post("/login", userController.loginRequire);
userRouter.delete("/logout", userController.logoutRequire);
userRouter.put(`/:${pk}`, userController.updateRequest);
userRouter.delete(`/:${pk}`, userController.deleteRequest);



module.exports = userRouter;